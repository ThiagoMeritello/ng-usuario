import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormatDateUtils } from 'src/app/utils/format-date-utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  errors: any[] = [];

  escolaridades: any[] = [];

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    super();

    super.configurarMensagensValidacaoBase(this.validationMessages);
    this.usuario = this.route.snapshot.data['usuario'];
  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: [''],
      sobrenome: [''],
      email: [''],
      dataNascimento: [''],
      escolaridade: ['']
    });

    this.usuarioService.obterEscolaridades()
      .map((esc) => this.escolaridades.push(esc));

    this.usuarioForm.patchValue({
      id: this.usuario.id,
      nome: this.usuario.nome,
      sobrenome: this.usuario.sobrenome,
      email: this.usuario.email,
      dataNascimento: FormatDateUtils.FormatarDateParaStringData(new Date(this.usuario.dataNascimento)),
      escolaridade: this.usuario.escolaridade,
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.usuarioForm);
  }

  deletarUsuario() {
    this.usuario = Object.assign({}, this.usuario, this.usuarioForm.value);
    
    this.usuario.escolaridade = +this.usuario.escolaridade;

    this.usuarioService.deletar(this.usuario.id)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarFalha(falha) }
      );      
  }

  processarSucesso(response: any) {
    this.usuarioForm.reset();
    this.errors = [];

    this.mudancasNaoSalvar = false;

    let toast = this.toastr.success('Usuário atualizado com sucesso!', 'Sucesso!');
    if(toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/usuario/listar']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
