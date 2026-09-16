CREATE TABLE public.event_profiles (
  id uuid PRIMARY KEY,
  full_name text NOT NULL,
  institution text NOT NULL,
  experience_level text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_profiles TO authenticated;
GRANT ALL ON public.event_profiles TO service_role;
ALTER TABLE public.event_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants manage their own profile" ON public.event_profiles FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email text NOT NULL,
  full_name text NOT NULL,
  institution text NOT NULL,
  experience_level text NOT NULL,
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants manage their own registration" ON public.event_registrations FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.event_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number integer NOT NULL,
  event_date date NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  session_time text NOT NULL,
  session_type text NOT NULL,
  meeting_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.event_sessions TO authenticated;
GRANT ALL ON public.event_sessions TO service_role;
ALTER TABLE public.event_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered participants can view sessions" ON public.event_sessions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.event_registrations r WHERE r.user_id = auth.uid()));

CREATE TABLE public.event_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  resource_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.event_resources TO authenticated;
GRANT ALL ON public.event_resources TO service_role;
ALTER TABLE public.event_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered participants can view resources" ON public.event_resources FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.event_registrations r WHERE r.user_id = auth.uid()));

CREATE TABLE public.event_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.event_announcements TO authenticated;
GRANT ALL ON public.event_announcements TO service_role;
ALTER TABLE public.event_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered participants can view announcements" ON public.event_announcements FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.event_registrations r WHERE r.user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.update_event_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_event_profiles_updated_at BEFORE UPDATE ON public.event_profiles FOR EACH ROW EXECUTE FUNCTION public.update_event_updated_at();
CREATE TRIGGER update_event_registrations_updated_at BEFORE UPDATE ON public.event_registrations FOR EACH ROW EXECUTE FUNCTION public.update_event_updated_at();
CREATE TRIGGER update_event_sessions_updated_at BEFORE UPDATE ON public.event_sessions FOR EACH ROW EXECUTE FUNCTION public.update_event_updated_at();
CREATE TRIGGER update_event_resources_updated_at BEFORE UPDATE ON public.event_resources FOR EACH ROW EXECUTE FUNCTION public.update_event_updated_at();
CREATE TRIGGER update_event_announcements_updated_at BEFORE UPDATE ON public.event_announcements FOR EACH ROW EXECUTE FUNCTION public.update_event_updated_at();

INSERT INTO public.event_sessions (day_number, event_date, title, description, session_time, session_type, meeting_url) VALUES
  (1, '2026-10-11', 'Opening keynote', 'Opening session details will be confirmed by the organizing team.', 'Time TBD', 'Keynote', NULL),
  (1, '2026-10-11', 'Qiskit fundamentals', 'A guided first step into quantum circuits. Facilitator and timing TBD.', 'Time TBD', 'Workshop', NULL),
  (2, '2026-10-12', 'Circuits and coding lab', 'Hands-on workshop details will be published here when confirmed.', 'Time TBD', 'Workshop', NULL),
  (2, '2026-10-12', 'Quantum algorithms intro', 'Session outline and speaker details are being finalized.', 'Time TBD', 'Talk', NULL),
  (3, '2026-10-13', 'Build challenge', 'Challenge brief, timing, and access details will be announced to participants.', 'Time TBD', 'Challenge', NULL),
  (3, '2026-10-13', 'Circuit builder lab', 'Lab details will be confirmed by the organizing team.', 'Time TBD', 'Workshop', NULL),
  (4, '2026-10-14', 'Participant showcase', 'Showcase format and timing will be announced closer to the event.', 'Time TBD', 'Showcase', NULL),
  (4, '2026-10-14', 'Closing session', 'Closing session details will be confirmed by the organizing team.', 'Time TBD', 'Closing', NULL);

INSERT INTO public.event_resources (title, description, resource_url) VALUES
  ('Participant setup guide', 'A setup guide will be published here before the festival.', NULL),
  ('Starter notebook', 'The starter notebook will be shared with registered participants.', NULL);

INSERT INTO public.event_announcements (title, body) VALUES
  ('Welcome to the participant space', 'Registration is open. Session links and confirmed resources will appear here as the program is finalized.');