const fs = require('fs');
let code = fs.readFileSync('components/my-gifting-life.tsx', 'utf8');

if (!code.includes('const [people, setPeople] = useState')) {
  // Add state
  code = code.replace(
    'export function MyGiftingLife() {',
    `export function MyGiftingLife() {
  const [people, setPeople] = useState([
    { id: 1, name: "James", relationship: "Partner", event: "Birthday in 8d", initial: "J" },
    { id: 2, name: "Mum", relationship: "Mother", event: "Anniversary in 21d", initial: "M" }
  ]);
  const [newName, setNewName] = useState("");
  const [newRelationship, setNewRelationship] = useState("");
  const [newOccasion, setNewOccasion] = useState("");
  
  const handleAddPerson = (e) => {
    e.preventDefault();
    if (newName) {
      setPeople([...people, {
        id: Date.now(),
        name: newName,
        relationship: newRelationship || "Friend",
        event: newOccasion ? \`\${newOccasion} upcoming\` : "No event",
        initial: newName.charAt(0).toUpperCase()
      }]);
      // Reset form
      setNewName("");
      setNewRelationship("");
      setNewOccasion("");
      // Close dialog
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
    }
  };`
  );

  // Replace form inputs to be controlled
  code = code.replace('<Input id="name" placeholder="e.g. Jane" />', '<Input id="name" placeholder="e.g. Jane" value={newName} onChange={e => setNewName(e.target.value)} />');
  code = code.replace('<Select>', '<Select value={newRelationship} onValueChange={setNewRelationship}>');
  code = code.replace('<Select>', '<Select value={newOccasion} onValueChange={setNewOccasion}>');
  code = code.replace('<Button type="submit">Save Reminder</Button>', '<Button type="button" onClick={handleAddPerson}>Save Reminder</Button>');

  // Replace the hardcoded list
  const hardcodedList = `<div className="divide-y divide-zinc-100">
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-rose-100 text-rose-700 font-bold">J</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">James</p>
                      <p className="text-xs text-zinc-500 font-medium">Partner</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Birthday in 8d</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">M</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">Mum</p>
                      <p className="text-xs text-zinc-500 font-medium">Mother</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Anniversary in 21d</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">S</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">Sarah's Baby</p>
                      <p className="text-xs text-zinc-500 font-medium">Friend</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">Shower in 2mo</p>
                  </div>
                </div>
              </div>`;

  const mapList = `<div className="divide-y divide-zinc-100">
                {people.map(person => (
                  <div key={person.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-rose-100 text-rose-700 font-bold">{person.initial}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm text-zinc-900">{person.name}</p>
                        <p className="text-xs text-zinc-500 font-medium">{person.relationship}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">{person.event}</p>
                    </div>
                  </div>
                ))}
              </div>`;

  code = code.replace(hardcodedList, mapList);

  fs.writeFileSync('components/my-gifting-life.tsx', code);
}
