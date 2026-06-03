-- Solar System Learning Portal - Supabase Schema
-- Run this in the Supabase SQL Editor

-- Child Profiles Table
CREATE TABLE IF NOT EXISTS child_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    age INTEGER DEFAULT 7,
    grade TEXT DEFAULT '3',
    avatar_emoji TEXT DEFAULT '🚀',
    parent_email TEXT,
    device_id TEXT UNIQUE
);

-- Progress Table (visited planets, missions, points)
CREATE TABLE IF NOT EXISTS progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    visited_planets TEXT[] DEFAULT '{}',
    completed_missions TEXT[] DEFAULT '{}',
    earned_badges TEXT[] DEFAULT '{}',
    exploration_points INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0
);

-- Quiz Scores Table
CREATE TABLE IF NOT EXISTS quiz_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    planet_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage INTEGER GENERATED ALWAYS AS (score * 100 / total_questions) STORED
);

-- Badges Earned Table
CREATE TABLE IF NOT EXISTS badges_earned (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL,
    planet_id TEXT,
    UNIQUE(child_id, badge_id)
);

-- Enable Row Level Security
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges_earned ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies (permissive for educational app with anonymous users)
CREATE POLICY "Allow anonymous insert" ON child_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read all profiles" ON child_profiles FOR SELECT USING (true);
CREATE POLICY "Allow update all profiles" ON child_profiles FOR UPDATE USING (true);

CREATE POLICY "Allow all progress operations" ON progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all quiz operations" ON quiz_scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all badge operations" ON badges_earned FOR ALL USING (true) WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_progress_child_id ON progress(child_id);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_child_id ON quiz_scores(child_id);
CREATE INDEX IF NOT EXISTS idx_badges_earned_child_id ON badges_earned(child_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_child_profiles_updated_at ON child_profiles;
CREATE TRIGGER update_child_profiles_updated_at
    BEFORE UPDATE ON child_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_progress_updated_at ON progress;
CREATE TRIGGER update_progress_updated_at
    BEFORE UPDATE ON progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
