-- Create storage buckets for PDFs and documents
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('event-proposals', 'event-proposals', false),
  ('club-documents', 'club-documents', true);

-- Create event proposals table
CREATE TABLE public.event_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_email TEXT NOT NULL,
  organizer_phone TEXT,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  venue TEXT NOT NULL,
  expected_participants INTEGER NOT NULL,
  budget_estimate DECIMAL(10,2),
  description TEXT NOT NULL,
  objectives TEXT,
  additional_requirements TEXT,
  pdf_document_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on event proposals
ALTER TABLE public.event_proposals ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since no auth in frontend)
CREATE POLICY "Anyone can insert event proposals" 
ON public.event_proposals 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view event proposals" 
ON public.event_proposals 
FOR SELECT 
USING (true);

-- Create clubs table
CREATE TABLE public.clubs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  coordinator_name TEXT NOT NULL,
  coordinator_email TEXT NOT NULL,
  channel_link TEXT,
  instagram_link TEXT,
  is_active BOOLEAN DEFAULT true,
  formed_date DATE,
  charter_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on clubs
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to clubs
CREATE POLICY "Anyone can view clubs" 
ON public.clubs 
FOR SELECT 
USING (true);

-- Create club formation requests table
CREATE TABLE public.club_formation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_name TEXT NOT NULL,
  proposed_by_name TEXT NOT NULL,
  proposed_by_email TEXT NOT NULL,
  proposed_by_phone TEXT,
  club_description TEXT NOT NULL,
  club_objectives TEXT NOT NULL,
  faculty_advisor TEXT,
  initial_members TEXT[], -- Array of member names
  proposed_activities TEXT,
  charter_document_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on club formation requests
ALTER TABLE public.club_formation_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Anyone can insert club formation requests" 
ON public.club_formation_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view club formation requests" 
ON public.club_formation_requests 
FOR SELECT 
USING (true);

-- Create important contacts table
CREATE TABLE public.important_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT,
  phone_number TEXT NOT NULL,
  email TEXT,
  department TEXT,
  is_emergency BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on important contacts
ALTER TABLE public.important_contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Anyone can view important contacts" 
ON public.important_contacts 
FOR SELECT 
USING (true);

-- Create hostel information table
CREATE TABLE public.hostel_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hostel_name TEXT NOT NULL,
  warden_name TEXT,
  warden_contact TEXT,
  capacity INTEGER,
  facilities TEXT[],
  rules TEXT[],
  timings JSONB, -- For different timing rules
  emergency_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on hostel info
ALTER TABLE public.hostel_info ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Anyone can view hostel info" 
ON public.hostel_info 
FOR SELECT 
USING (true);

-- Insert sample important contacts data based on the screenshot
INSERT INTO public.important_contacts (name, designation, phone_number, email, department, display_order) VALUES
  ('Security', 'Security Department', '+91 9868244868 || +91 11 26907592 or Extn. 592', 'security@iiitd.ac.in', 'Security', 1),
  ('IT Department', 'IT Support', '+91 11 26907576 or Extn. 576', 'it@iiitd.ac.in', 'IT Department', 2),
  ('FMS', 'Facility Management', '+91 9868878433 || +91 11 26906566 or Extn. 566', 'fms@iiitd.ac.in', 'FMS', 3),
  ('Ravi Bhasin', 'Student Affairs', '+91 9810165438 || +91 11 26907504', 'ravi@iiitd.ac.in', 'Student Affairs', 4),
  ('Jogadanand Dwivedi', 'JM, Student Affairs', '+91 8700332868', 'jogadanand@iiitd.ac.in', 'Student Affairs', 5),
  ('Sonal Garg', 'JM, Student Affairs', '+91 9891749944', 'sonal@iiitd.ac.in', 'Student Affairs', 6);

-- Insert sample clubs data
INSERT INTO public.clubs (name, description, category, coordinator_name, coordinator_email, channel_link, instagram_link) VALUES
  ('Coding Club', 'Programming and competitive coding community', 'Technical', 'John Doe', 'coding@iiitd.ac.in', 'https://discord.gg/codingclub', 'https://instagram.com/iiitd_coding'),
  ('Cultural Society', 'Promoting arts, music, and cultural activities', 'Cultural', 'Jane Smith', 'cultural@iiitd.ac.in', 'https://discord.gg/cultural', 'https://instagram.com/iiitd_cultural'),
  ('Sports Club', 'Athletic activities and tournaments', 'Sports', 'Mike Johnson', 'sports@iiitd.ac.in', 'https://discord.gg/sports', 'https://instagram.com/iiitd_sports'),
  ('Robotics Club', 'Building and programming robots', 'Technical', 'Sarah Wilson', 'robotics@iiitd.ac.in', 'https://discord.gg/robotics', 'https://instagram.com/iiitd_robotics'),
  ('Photography Club', 'Capturing moments and learning photography', 'Creative', 'Alex Brown', 'photography@iiitd.ac.in', 'https://discord.gg/photography', 'https://instagram.com/iiitd_photography');

-- Create storage policies for event proposals (private)
CREATE POLICY "Event proposal documents access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'event-proposals');

CREATE POLICY "Anyone can upload event proposal documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'event-proposals');

-- Create storage policies for club documents (public)
CREATE POLICY "Club documents are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'club-documents');

CREATE POLICY "Anyone can upload club documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'club-documents');

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_proposals_updated_at
  BEFORE UPDATE ON public.event_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clubs_updated_at
  BEFORE UPDATE ON public.clubs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_club_formation_requests_updated_at
  BEFORE UPDATE ON public.club_formation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_important_contacts_updated_at
  BEFORE UPDATE ON public.important_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hostel_info_updated_at
  BEFORE UPDATE ON public.hostel_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();