// Placeholder member registry.
// Shape is intentionally aligned with a future API response.
// Replace this with a fetch() call when backend/KenzAI bot integration lands.
export const members = [
  {
    empireId: "YZ-001",
    username: "ExampleUser",
    clan: "SNU",
    role: "Member",
    status: "Active",
  },
];

// Allowed enums — lets UI render filters, badges, and validators without
// duplicating these strings across files.
export const memberRoles = ["Leader", "Officer", "Member", "Initiate"];
export const memberStatuses = ["Active", "Draft", "Inactive"];
