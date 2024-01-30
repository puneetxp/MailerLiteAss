import { Validators } from '@angular/forms'; 
export const CreatestatusForm = {
  name: { validator: [Validators.required] },
};
export const UpdatestatusForm = {
  id: { validator: [Validators.required] },
  created_at: { validator: [Validators.required] },
  updated_at: { validator: [Validators.required] },
  name: { validator: [Validators.required] },
};