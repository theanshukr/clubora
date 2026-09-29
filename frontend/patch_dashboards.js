const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'dashboards');
const files = [
  'EmployeeDashboard.tsx',
  'HRManagerDashboard.tsx',
  'ITAdminDashboard.tsx',
  'FinanceDashboard.tsx',
  'SuperAdminDashboard.tsx'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add aiQuery state if not exists
  if (!content.includes('const [aiQuery, setAiQuery]')) {
    content = content.replace(
      /const \[mounted, setMounted\] = useState\(false\);/g,
      "const [mounted, setMounted] = useState(false);\n  const [aiQuery, setAiQuery] = useState('');"
    );
    
    // Some dashboards might not have mounted, find loading instead
    if (!content.includes('setAiQuery')) {
        content = content.replace(
          /const \[loading, setLoading\] = useState\(true\);/g,
          "const [loading, setLoading] = useState(true);\n  const [aiQuery, setAiQuery] = useState('');"
        );
    }
  }

  // Add handleAiSubmit
  if (!content.includes('const handleAiSubmit')) {
    content = content.replace(
      /useEffect\(\(\) => \{/g,
      "const handleAiSubmit = () => {\n    if (aiQuery.trim()) {\n      navigate(`/ai-assistant/${roleSlug}`, { state: { initialQuery: aiQuery } });\n    }\n  };\n\n  useEffect(() => {"
    );
  }

  // Update the input element
  content = content.replace(
    /onFocus=\{\(\) => setIsAiActive\(true\)\}\s*onBlur=\{\(\) => setIsAiActive\(false\)\}/g,
    "onFocus={() => setIsAiActive(true)}\n            onBlur={() => setIsAiActive(false)}\n            value={aiQuery}\n            onChange={(e) => setAiQuery(e.target.value)}\n            onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}"
  );

  // Update the send button
  content = content.replace(
    /<button className="btn btn-primary" style=\{\{ borderRadius: '10px' \}\}>/g,
    '<button className="btn btn-primary" style={{ borderRadius: \'10px\' }} onClick={handleAiSubmit}>'
  );

  fs.writeFileSync(filePath, content);
  console.log('Patched', file);
});
