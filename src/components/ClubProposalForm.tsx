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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const formSchema = z.object({
  club_name: z.string().min(3, "Club name must be at least 3 characters"),
  founders: z.string().min(3, "Please list at least one founder"),
  proposal_link: z.string().url("Please enter a valid URL").or(z.literal(""))
});

type FormValues = z.infer<typeof formSchema>;

export function ClubProposalForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      club_name: "",
      founders: "",
      proposal_link: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      setIsSuccess(false);

      // Prepare the club proposal data
      const proposalData = {
        club_name: values.club_name,
        founders: values.founders,
        proposal_link: values.proposal_link || null,
      };

      // Insert the club proposal
      const { error } = await supabase
        .from("club_proposals")
        .insert([proposalData]);

      if (error) {
        console.error("Error creating club proposal:", error);
        throw new Error(
          error.message || "Failed to create club proposal. Please try again."
        );
      }

      // Show success message
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
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Propose a New Club</h3>
        <p className="text-sm text-muted-foreground">
          Submit your club proposal for review. All fields are required unless marked optional.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="club_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter club name"
                      {...field}
                      disabled={isSubmitting}
                      className="w-full"
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
                  <FormLabel>Founders</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="List all founders"
                      {...field}
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposal_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Link (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://docs.google.com/document/..."
                      {...field}
                      value={field.value || ""}
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
