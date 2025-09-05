-- Update the initialize_event_approvals function to exclude developer role
CREATE OR REPLACE FUNCTION public.initialize_event_approvals()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert pending approvals for all active authorized admins except developers
  INSERT INTO public.event_approvals (event_proposal_id, admin_email, status)
  SELECT NEW.id, email, 'pending'
  FROM public.authorized_admins 
  WHERE is_active = true AND role != 'developer';
  
  RETURN NEW;
END;
$function$;

-- Also create the trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_initialize_event_approvals'
    ) THEN
        CREATE TRIGGER trigger_initialize_event_approvals
        AFTER INSERT ON public.event_proposals
        FOR EACH ROW
        EXECUTE FUNCTION public.initialize_event_approvals();
    END IF;
END $$;