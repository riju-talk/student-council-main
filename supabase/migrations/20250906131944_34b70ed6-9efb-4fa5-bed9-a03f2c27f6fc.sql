-- Fix the approval record management to exclude the main developer
-- First, let's update the function to exclude rijusmit22000@iiitd.ac.in specifically
CREATE OR REPLACE FUNCTION public.initialize_event_approvals()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Insert pending approvals for all active authorized admins except developers and the main developer
  INSERT INTO public.event_approvals (event_proposal_id, admin_email, status)
  SELECT NEW.id, email, 'pending'
  FROM public.authorized_admins 
  WHERE is_active = true 
    AND role != 'developer' 
    AND email != 'rijusmit22000@iiitd.ac.in';
  
  RETURN NEW;
END;
$function$