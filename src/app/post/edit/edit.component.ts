import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    // Inicia o formulário vazio
    this.form = new FormGroup({
      id_implementacao: new FormControl('', Validators.required),
      resultado: new FormControl('', Validators.required),
      detalhes_teste: new FormControl('', Validators.required),
      data_teste: new FormControl('', Validators.required),
      responsavel_teste: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

    // Preenche os dados
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;

      this.form.setValue({
        id_implementacao: data.id_implementacao,
        resultado: data.resultado,
        detalhes_teste: data.detalhes_teste,
        data_teste: this.formatDate(data.data_teste),
        responsavel_teste: data.responsavel_teste,
        status: data.status
      });
    });
  }

formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Retorna no formato yyyy-MM-dd
}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;

    this.postService.update(this.id, this.form.value).subscribe(() => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('post/index');
    });
  }
}
