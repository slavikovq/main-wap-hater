import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";

import ClassView from "./Class/View/View";
import ClassList from "./Class/List/List";
import ClassCreateForm from "./Class/CreateForm/CreateForm";
import ClassUpdateForm from "./Class/UpdateForm/UpdateForm";
import CreatedClass from "./Class/CreateForm/Created";
import ClassDeleted from "./Class/View/Deleted";

import StudentView from "./Student/View/View";
import StudentList from "./Student/List/List";
import StudentCreateForm from "./Student/CreateForm/CreateForm";
import StudentUpdateForm from "./Student/UpdateForm/UpdateForm";
import CreatedStudent from "./Student/CreateForm/Created";
import StudentDeleted from "./Student/View/Deleted";

import SubjectView from "./Subject/View/View";
import SubjectList from "./Subject/List/List";
import SubjectCreateForm from "./Subject/CreateForm/CreateForm";
import SubjectUpdateForm from "./Subject/UpdateForm/UpdateForm";
import CreatedSubject from "./Subject/CreateForm/Created";
import SubjectDeleted from "./Subject/View/Deleted";

import TeacherView from "./Teacher/View/View";
import TeacherList from "./Teacher/List/List";
import TeacherCreateForm from "./Teacher/CreateForm/CreateForm";
import TeacherUpdateForm from "./Teacher/UpdateForm/UpdateForm";
import CreatedTeacher from "./Teacher/CreateForm/Created";
import TeacherDeleted from "./Teacher/View/Deleted";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/class/:id" element={<ClassView />} />
        <Route path="/classes" element={<ClassList />} />
        <Route path="/createclass" element={<ClassCreateForm />} />
        <Route path="/updateclass/:id" element={<ClassUpdateForm />} />
        <Route path="/createdclass/:id" element={<CreatedClass />} />
        <Route path="/deletedclass/:id" element={<ClassDeleted />} />

        <Route path="/student/:id" element={<StudentView />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/createstudent" element={<StudentCreateForm />} />
        <Route path="/updatestudent/:id" element={<StudentUpdateForm />} />
        <Route path="/createdstudent/:id" element={<CreatedStudent />} />
        <Route path="/deletedstudent/:id" element={<StudentDeleted />} />

        <Route path="/subject/:id" element={<SubjectView />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/createsubject" element={<SubjectCreateForm />} />
        <Route path="/updatesubject/:id" element={<SubjectUpdateForm />} />
        <Route path="/createdsubject/:id" element={<CreatedSubject />} />
        <Route path="/deletedsubject/:id" element={<SubjectDeleted />} />

        <Route path="/teacher/:id" element={<TeacherView />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/createteacher" element={<TeacherCreateForm />} />
        <Route path="/updateteacher/:id" element={<TeacherUpdateForm />} />
        <Route path="/createdteacher/:id" element={<CreatedTeacher />} />
        <Route path="/deletedteacher/:id" element={<TeacherDeleted />} />

      </Routes>
    </BrowserRouter>
  );
}
