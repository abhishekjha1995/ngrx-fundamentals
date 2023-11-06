import { Action, createReducer, on } from "@ngrx/store";
import { FormGroupState, createFormGroupState, formGroupReducer, setValue, updateGroup, validate } from "ngrx-forms";
import { required } from "ngrx-forms/validation";
import { resetForm } from "./app.action";

export interface MyGroup {
    username: string;
    password: string;
}

const FORM_ID = '[APP] FORM ID';

const initialFormState = createFormGroupState<MyGroup>(FORM_ID, {
    username: '',
    password: ''
});

export const validateLoginForm = updateGroup<MyGroup>({
  username: validate(required),
  password: validate(required)
});

function handleResetForm(myForm: FormGroupState<MyGroup>, props: ReturnType<typeof resetForm>) {
  return updateGroup(myForm, {
    username: setValue(''),
    password: setValue('')
  });
}

const _reducer = createReducer(initialFormState, on(resetForm, handleResetForm));

export function appReducer(myForm = initialFormState, action: Action): FormGroupState<MyGroup> {
  let updated: FormGroupState<MyGroup> = formGroupReducer(myForm, action);
  updated = validateLoginForm(updated);
  updated = _reducer(updated, action);

  return updated;
}