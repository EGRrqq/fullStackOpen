import { Gender } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const GenderIcon = ({ gender }: { gender: Gender | undefined }) => {
    switch (gender) {
        case "male":
            return <FemaleIcon />;
        case "female":
            return <MaleIcon />;
        default:
            return <QuestionMarkIcon />;
    }
};

export default GenderIcon;