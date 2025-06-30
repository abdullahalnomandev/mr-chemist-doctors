-- Treatment Types Table
CREATE TABLE treatment_types (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,  -- e.g., 'weightLoss', 'hairLoss'
  name VARCHAR(100) NOT NULL,
  description TEXT,
  position INT NOT NULL,  -- Added position field for ordering
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consultation Steps Table
CREATE TABLE consultation_steps (
  id SERIAL PRIMARY KEY,
  step_code VARCHAR(50) NOT NULL UNIQUE,  -- Renamed from step_id to step_code
  title VARCHAR(100) NOT NULL,
  position INT NOT NULL,  -- Renamed from display_order to position
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Treatment Type to Step Mapping
CREATE TABLE treatment_steps (
  id SERIAL PRIMARY KEY,
  treatment_type_id INT NOT NULL REFERENCES treatment_types(id) ON DELETE CASCADE,
  step_id INT NOT NULL REFERENCES consultation_steps(id) ON DELETE CASCADE,
  position INT NOT NULL,  -- Renamed from display_order to position
  UNIQUE(treatment_type_id, step_id)
);

-- Question Types Table
CREATE TABLE question_types (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,  -- e.g., 'yesNo', 'text', 'checkbox'
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question_code VARCHAR(50) NOT NULL UNIQUE,  -- Renamed from question_id to question_code
  question_type_id INT NOT NULL REFERENCES question_types(id),
  question_text TEXT NOT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  description TEXT,
  placeholder TEXT,
  prefix VARCHAR(50),
  suffix VARCHAR(50),
  label TEXT,  -- For checkbox type questions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step to Question Mapping
CREATE TABLE step_questions (
  id SERIAL PRIMARY KEY,
  step_id INT NOT NULL REFERENCES consultation_steps(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  position INT NOT NULL,  -- Renamed from display_order to position
  UNIQUE(step_id, question_id)
);

-- Question Options Table (for select, radio, checkboxGroup)
CREATE TABLE question_options (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  value VARCHAR(100) NOT NULL,
  label TEXT NOT NULL,
  position INT NOT NULL,  -- Renamed from display_order to position
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(question_id, value)
);

-- Conditional Questions Table
CREATE TABLE conditional_questions (
  id SERIAL PRIMARY KEY,
  parent_question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  child_question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  condition_value VARCHAR(50) NOT NULL,  -- 'yes', 'no', or specific option value
  position INT NOT NULL,  -- Added position field for ordering
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(parent_question_id, child_question_id, condition_value)
);

-- User Consultations Table
CREATE TABLE consultations (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,  -- Reference to your users table
  treatment_type_id INT NOT NULL REFERENCES treatment_types(id),
  status VARCHAR(50) NOT NULL DEFAULT 'submitted',  -- 'submitted', 'reviewed', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consultation Answers Table
CREATE TABLE consultation_answers (
  id SERIAL PRIMARY KEY,
  consultation_id INT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES questions(id),
  answer_text TEXT,  -- For text, textarea, date inputs
  answer_boolean BOOLEAN,  -- For yes/no, checkbox inputs
  answer_numeric DECIMAL(10, 2),  -- For number inputs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consultation Answer Options Table (for multi-select answers)
CREATE TABLE consultation_answer_options (
  id SERIAL PRIMARY KEY,
  consultation_answer_id INT NOT NULL REFERENCES consultation_answers(id) ON DELETE CASCADE,
  option_id INT NOT NULL REFERENCES question_options(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(consultation_answer_id, option_id)
);

-- Consultation Notes Table (for clinician review)
CREATE TABLE consultation_notes (
  id SERIAL PRIMARY KEY,
  consultation_id INT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  clinician_id INT NOT NULL,  -- Reference to your clinicians/staff table
  notes TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consultation Files Table (for uploaded photos, documents)
CREATE TABLE consultation_files (
  id SERIAL PRIMARY KEY,
  consultation_id INT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  file_type VARCHAR(50) NOT NULL,  -- 'photo', 'document', etc.
  file_path TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data for treatment types
INSERT INTO treatment_types (code, name, description, position) VALUES
('weightLoss', 'Weight Loss', 'Consultation for weight loss treatments', 1),
('hairLoss', 'Hair Loss', 'Consultation for hair loss treatments', 2),
('skinCare', 'Skin Care', 'Consultation for skin care treatments', 3),
('mentalHealth', 'Mental Health', 'Consultation for mental health support', 4),
('sexualHealth', 'Sexual Health', 'Consultation for sexual health treatments', 5);

-- Insert initial data for question types
INSERT INTO question_types (code, name) VALUES
('yesNo', 'Yes/No Question'),
('text', 'Text Input'),
('textarea', 'Text Area'),
('checkbox', 'Checkbox'),
('radio', 'Radio Button'),
('select', 'Select Dropdown'),
('date', 'Date Picker'),
('number', 'Number Input'),
('checkboxGroup', 'Checkbox Group');
