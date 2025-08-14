-- Create mess and hostel committee table
CREATE TABLE public.mess_hostel_committee (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mess_hostel_committee ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing committee members
CREATE POLICY "Anyone can view mess hostel committee" 
ON public.mess_hostel_committee 
FOR SELECT 
USING (true);

-- Create student representatives table
CREATE TABLE public.student_representatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT NOT NULL,
  official_email TEXT,
  program TEXT NOT NULL,
  year INTEGER NOT NULL,
  branch TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_representatives ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing representatives
CREATE POLICY "Anyone can view student representatives" 
ON public.student_representatives 
FOR SELECT 
USING (true);

-- Insert mess and hostel committee members
INSERT INTO public.mess_hostel_committee (name, email) VALUES
  ('Rishit Saharan', 'rishit19382@iiitd.ac.in'),
  ('Jayan Pahuja', 'jayan20071@iiitd.ac.in'),
  ('Anuj Yadav', 'anuj20284@iiitd.ac.in'),
  ('Shashank Rustagi', 'shashank21081@iiitd.ac.in'),
  ('Digvijay', 'digvijay21251@iiitd.ac.in'),
  ('Tanuj Rana', 'tanuj19210@iiitd.ac.in'),
  ('Abhijay Tiwari', 'abhijay21439@iiitd.ac.in');

-- Insert student representatives
INSERT INTO public.student_representatives (name, position, email, official_email, program, year, branch) VALUES
  ('Nootan Sharma', 'President', 'nootan22340@iiitd.ac.in', 'president@sc.iiitd.ac.in', 'B.Tech', 2022, 'ECE'),
  ('Riya Gupta', 'Vice-President', 'riya22410@iiitd.ac.in', 'vp@sc.iiitd.ac.in', 'B.Tech', 2022, 'CSAM'),
  ('Krish Kumar Bhoruka', 'Treasurer', 'krish22253@iiitd.ac.in', 'treasurer@sc.iiitd.ac.in', 'B.Tech', 2022, 'CSSS'),
  ('Ayaan Hasan', 'Sports Secretary', 'ayaan22121@iiitd.ac.in', 'sports-coordinator@iiitd.ac.in', 'B.Tech', 2022, 'CSE'),
  ('Aditi Sharma', 'Member', 'aditi22025@iiitd.ac.in', '', 'B.Tech', 2022, 'CSE'),
  ('Shubham', 'Member', 'shubham22488@iiitd.ac.in', '', 'B.Tech', 2022, 'CSAI'),
  ('Kshitij Gupta', 'Member', 'kshitij22257@iiitd.ac.in', '', 'B.Tech', 2022, 'CSAM'),
  ('Omansh Arora', 'Member', 'omansh22342@iiitd.ac.in', '', 'B.Tech', 2022, 'CSD'),
  ('Mintu Kumar', 'Member', 'mintu22296@iiitd.ac.in', '', 'B.Tech', 2022, 'EVE'),
  ('Manaswi Singh', 'Member', 'manaswi23307@iiitd.ac.in', '', 'B.Tech', 2023, 'CSE'),
  ('Mohit Bhariya', 'Member', 'mohit23327@iiitd.ac.in', '', 'B.Tech', 2023, 'CSE'),
  ('Aditya Malik', 'Member', 'aditya23046@iiitd.ac.in', '', 'B.Tech', 2023, 'CSAI'),
  ('Saksham Bansal', 'Member', 'saksham23467@iiitd.ac.in', '', 'B.Tech', 2023, 'CSAM'),
  ('Yuvraj Rajput', 'Member', 'yuvraj23616@iiitd.ac.in', '', 'B.Tech', 2023, 'CSB'),
  ('Priyanshu Pandey', 'Member', 'priyanshu23406@iiitd.ac.in', '', 'B.Tech', 2023, 'CSSS'),
  ('Tanish Goel', 'Member', 'tanish23546@iiitd.ac.in', '', 'B.Tech', 2023, 'CSD'),
  ('Anurag Gupta', 'Member', 'anurag23112@iiitd.ac.in', '', 'B.Tech', 2023, 'ECE'),
  ('Krish Kumar', 'Member', 'krish23287@iiitd.ac.in', '', 'B.Tech', 2023, 'EVE'),
  ('Garv Jain', 'Member', 'garv24216@iiitd.ac.in', '', 'B.Tech', 2024, 'CSE'),
  ('Daksh Singh', 'Member', 'daksh24170@iiitd.ac.in', '', 'B.Tech', 2024, 'CSAI'),
  ('Aditya Kumar Giri', 'Member', 'aditya24037@iiitd.ac.in', '', 'B.Tech', 2024, 'CSAM'),
  ('Harshit Singhal', 'Member', 'harshit24250@iiitd.ac.in', '', 'B.Tech', 2024, 'CSB'),
  ('Rohan Yadav', 'Member', 'rohan24478@iiitd.ac.in', '', 'B.Tech', 2024, 'CSSS'),
  ('Sumeet Redhu', 'Member', 'sumeet24569@iiitd.ac.in', '', 'B.Tech', 2024, 'CSD'),
  ('Akarsh Sinha', 'Member', 'akarsh24051@iiitd.ac.in', '', 'B.Tech', 2024, 'ECE'),
  ('Aaryan Goyal', 'Member', 'aaryan24010@iiitd.ac.in', '', 'B.Tech', 2024, 'EVE'),
  ('Raman Chola', 'Member', 'raman24072@iiitd.ac.in', '', 'M.Tech', 2024, 'CSE'),
  ('Kanu Priya', 'Member', 'kanu24043@iiitd.ac.in', '', 'M.Tech', 2024, 'CSE');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_mess_hostel_committee_updated_at
BEFORE UPDATE ON public.mess_hostel_committee
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_representatives_updated_at
BEFORE UPDATE ON public.student_representatives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();