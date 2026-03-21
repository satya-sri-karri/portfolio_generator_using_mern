import { useState, useCallback } from "react";

const blank = {
  name: "", title: "", about: "", avatarUrl: "",
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  achievements: [],
  codingProfiles: [],
  contact: { email: "", phone: "" },
  socialLinks: { github: "", linkedin: "", twitter: "", website: "" },
  theme: "dark",
  isPublic: true,
};

export const usePortfolioForm = (initial = blank) => {
  const [form, setForm] = useState(initial);
  const [skillInput, setSkillInput] = useState("");

  const set = useCallback((field, val) =>
    setForm(p => ({ ...p, [field]: val })), []);

  const setNested = useCallback((parent, field, val) =>
    setForm(p => ({ ...p, [parent]: { ...p[parent], [field]: val } })), []);

  // Add skill from the text input
  const addSkill = useCallback(() => {
    const s = skillInput.trim();
    if (!s || form.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())) {
      setSkillInput(""); return;
    }
    setForm(p => ({ ...p, skills: [...p.skills, s] }));
    setSkillInput("");
  }, [skillInput, form.skills]);

  // Add skill directly by name — used by Quick Add buttons (no state timing issue)
  const addSkillDirect = useCallback((skillName) => {
    const s = skillName.trim();
    if (!s) return;
    setForm(p => {
      if (p.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())) return p;
      return { ...p, skills: [...p.skills, s] };
    });
  }, []);

  const removeSkill = useCallback(i =>
    setForm(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) })), []);

  // Generic array item add/update/remove
  const addItem = useCallback((arr, template) =>
    setForm(p => ({ ...p, [arr]: [...p[arr], { ...template }] })), []);

  const updateItem = useCallback((arr, i, field, val) =>
    setForm(p => {
      const next = [...p[arr]];
      next[i] = { ...next[i], [field]: val };
      return { ...p, [arr]: next };
    }), []);

  const removeItem = useCallback((arr, i) =>
    setForm(p => ({ ...p, [arr]: p[arr].filter((_, idx) => idx !== i) })), []);

  const reset = useCallback(() => setForm(blank), []);
  const load = useCallback((data) => setForm({ ...blank, ...data }), []);

  return {
    form, skillInput, setSkillInput,
    set, setNested,
    addSkill, addSkillDirect, removeSkill,
    addItem, updateItem, removeItem,
    reset, load,
  };
};
