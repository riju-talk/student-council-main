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

const formSchema = z.object({
  club_name: z.string().min(3, "Club name must be at least 3 characters"),
  founders: z
    .string()
    .min(3, "Please list at least one founder")
    .refine(
      (val) => val.includes(","),
      "Please enter names separated by commas (e.g., Alice, Bob, Charlie)"
    ),
  proposal_link: z
    .string()
    .url("Please enter a valid Google Drive/Docs link")
    .min(1, "Proposal link is required"),
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
    setIsSubmitting(true);
    try {
      const payload = {
        club_name: values.club_name,
        founders: values.founders,
        proposal_link: values.proposal_link,
      };

      const { error } = await supabase
        .from("club_proposals")
        .insert([payload]);

      if (error) throw error;

      toast({
        title: "✅ Proposal submitted successfully!",
        description: "Your proposal has been saved and is under review.",
      });

      form.reset();
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting proposal:", err);
      toast({
        title: "❌ Submission failed",
        description:
          err instanceof Error ? err.message : "An unexpected error occurred",
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium">Proposal Submitted Successfully!</h3>
        <p className="text-sm text-muted-foreground">
          Your club proposal has been received. We'll notify you once it's
          processed.
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
      <p className="text-sm text-muted-foreground">
        Submit your club proposal for review. Paste a Google Drive/Docs link and
        list founders separated by commas.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    placeholder="Alice, Bob, Charlie"
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
            name="proposal_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposal Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://drive.google.com/..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit Proposal"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
