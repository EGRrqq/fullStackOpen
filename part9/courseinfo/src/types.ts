interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
    description: string;
}

interface CourseSpecialPart extends CoursePartBaseDescription {
    type: "special";
    requirements: string[];
}

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

export type CoursePart = CourseSpecialPart | CourseNormalPart | CourseProjectPart | CourseSubmissionPart;