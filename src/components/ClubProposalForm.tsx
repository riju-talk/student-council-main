import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/integrations/supabase/types";

type ClubProposalInsert = Database['public']['Tables']['club_proposals']['Insert'];

export const formSchema = z.object({
  clubName: z.string().min(3, "Club name must be at least 3 characters"),
  founders: z.string().min(3, "Please list at least one founder"),
  proposalLink: z.string().url("Please enter a valid URL").or(z.literal("")),
  description: z.string().min(50, "Please provide a detailed description (at least 50 characters)"),
  objectives: z.string().min(30, "Please provide clear objectives (at least 30 characters)"),
  activities: z.string().min(30, "Please describe planned activities (at least 30 characters)"),
});

export function ClubProposalForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubName: "",
      founders: "",
      proposalLink: "",
      description: "",
      objectives: "",
      activities: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setIsSuccess(false);
      
      // Prepare the club proposal data
      const proposalData: ClubProposalInsert = {
        club_name: values.clubName,
        founders: values.founders,
        proposal_link: values.proposalLink || null,
        description: values.description,
        objectives: values.objectives,
        activities: values.activities,
        status: 'pending',
      };

      // Insert the club proposal
      const { data: proposal, error: proposalError } = await supabase
        .from("club_proposals")
        .insert(proposalData)
        .select()
        .single();

      if (proposalError) {
        console.error("Error creating club proposal:", proposalError);
        throw new Error(
          proposalError.message || "Failed to create club proposal. Please try again."
        );
      }

      // The approval process is handled by the database trigger
      toast({
        title: "✅ Proposal submitted successfully!",
        description: "Your club proposal has been submitted for review. You'll be notified once it's approved.",
      });
      
      setIsSuccess(true);
      form.reset();
      
    } catch (error) {
      console.error("Error submitting proposal:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      toast({
        title: "❌ Submission failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 p-6 border rounded-lg bg-card">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium">Proposal Submitted Successfully!</h3>
        <p className="text-sm text-muted-foreground">
          Your club proposal has been received and is under review. We'll notify you once it's been processed.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
          variant="outline"
          className="mt-4"
        >
          Submit Another Proposal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Propose a New Club</h3>
        <p className="text-sm text-muted-foreground">
          Fill out the form below to submit a proposal for a new student club. All fields are required unless marked optional.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="clubName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter club name"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="founders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Founder(s)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="List all founders"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Names and contact details of all founding members
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposalLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Document (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://docs.google.com/document/..."
                      {...field}
                      value={field.value || ''}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to detailed proposal document (Google Docs, PDF, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What is the purpose of this club?"
                    className="min-h-[100px]"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectives</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What are the main objectives of this club?"
                    className="min-h-[80px]"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Planned Activities</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What activities will the club organize?"
                    className="min-h-[80px]"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Proposal"
                )}
              </Button>
              {isSubmitting && (
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your submission...
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
