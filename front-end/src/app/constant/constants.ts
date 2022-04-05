export interface LoginModel {
    success: boolean;
    message: string;
    token: string;
    profile: {
        name: string;
        last_name: string;
        email: string;
        roll_number: string;
        class_name: string;
        role_id: string;
    }
}

export interface AddStudentModel {
    success: boolean;
    message: string;
}

export interface StudentModel {
    success: boolean;
    message: string;
    data: StudentListModel[]
}

export interface StudentListModel {
    id: number;
    name: string;
    last_name: string;
    email: string;
    roll_number: string;
    class_name: string;
}