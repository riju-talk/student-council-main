-- Add RLS policy for otp_verifications table to fix security linter warning
CREATE POLICY "Users can only access their own OTP verifications" 
ON public.otp_verifications 
FOR ALL 
USING (false) 
WITH CHECK (false);

-- This table should only be accessible by edge functions/server-side code
-- Users should not directly access OTP verification records