-- Create club_proposals table
CREATE TABLE IF NOT EXISTS public.club_proposals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  club_name text NOT NULL,
  founders text NOT NULL,
  proposal_link text,
  description text,
  objectives text,
  activities text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT club_proposals_pkey PRIMARY KEY (id)
);

-- Create approvals table
CREATE TABLE IF NOT EXISTS public.approvals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL,
  admin_email text NOT NULL,
  approved_at timestamp with time zone,
  comments text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  type text NOT NULL CHECK (type IN ('club_proposal', 'event_proposal')),
  CONSTRAINT approvals_pkey PRIMARY KEY (id),
  CONSTRAINT approvals_proposal_id_fkey FOREIGN KEY (proposal_id) 
    REFERENCES public.club_proposals(id) ON DELETE CASCADE,
  CONSTRAINT approvals_admin_email_fkey FOREIGN KEY (admin_email) 
    REFERENCES public.authorized_admins(email) ON DELETE CASCADE
);

-- Add RLS policies for club_proposals
ALTER TABLE public.club_proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.club_proposals
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.club_proposals
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add RLS policies for approvals
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.approvals
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.approvals
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create function to handle new club proposal creation and approval workflow
CREATE OR REPLACE FUNCTION public.handle_new_club_proposal()
RETURNS TRIGGER AS $$
BEGIN
  -- Create approval records for all active admins except Main Developer
  INSERT INTO public.approvals (proposal_id, admin_email, type)
  SELECT NEW.id, email, 'club_proposal'
  FROM public.authorized_admins
  WHERE is_active = true AND role != 'Main Developer';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new club proposals
DROP TRIGGER IF EXISTS on_club_proposal_created ON public.club_proposals;
CREATE TRIGGER on_club_proposal_created
  AFTER INSERT ON public.club_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_club_proposal();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers for timestamps
DROP TRIGGER IF EXISTS update_club_proposals_timestamp ON public.club_proposals;
CREATE TRIGGER update_club_proposals_timestamp
  BEFORE UPDATE ON public.club_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

DROP TRIGGER IF EXISTS update_approvals_timestamp ON public.approvals;
CREATE TRIGGER update_approvals_timestamp
  BEFORE UPDATE ON public.approvals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();
