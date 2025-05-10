import { HeadCells } from "@/components/organisms/table";
import { Typography } from "@mui/material";

export const headCells: HeadCells = [
  {
    id: "name",
    label: <Typography>Name</Typography>,
  },
  {
    id: "totalAverageWeightRatings",
    label: <Typography>Weight Ratings</Typography>,
  },
  {
    id: "numberOfRents",
    label: <Typography>Number of Rents</Typography>,
  },
  {
    id: "recentlyActive",
    label: <Typography>Recent Active Time</Typography>,
  },
  {
    id: "actions",
    label: <Typography>Actions</Typography>,
  },
];
