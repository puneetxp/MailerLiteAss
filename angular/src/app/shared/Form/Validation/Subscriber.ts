import { FormControl, FormGroup, Validators } from '@angular/forms';
export const CreatesubscriberForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  lastname: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phone: new FormControl('', [Validators.required]),
  status_id: new FormControl<string | null>(null, [Validators.required]),
});
export const UpdatesubscriberForm = new FormGroup({
  id: new FormControl('', [Validators.required]),
  name: new FormControl('', [Validators.required]),
  lastname: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phone: new FormControl('', [Validators.required]),
  status_id: new FormControl<number | null>(null, [Validators.required]),
});
