import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormatDateUtils } from 'src/app/utils/format-date-utils';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  errors: any[] = [];

  dataAtual = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  escolaridades: any[] = [];

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { 
    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      sobrenome: {
        required: 'Informe o Sobrenome'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      dataNascimento: {
        required: 'Informe a data nascimento',
        maxDate: 'Data de nascimento é maior que a data atual'
      },
      escolaridade: {
        required: 'Informe o Valor',
      }
    }
    super.configurarMensagensValidacaoBase(this.validationMessages);
    this.usuario = this.route.snapshot.data['usuario'];
  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, CustomValidators.maxDate(new Date(this.dataAtual))]],
      escolaridade: ['', [Validators.required]]
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

  editarUsuario() {
    this.usuario = Object.assign({}, this.usuario, this.usuarioForm.value);
    
    this.usuario.escolaridade = +this.usuario.escolaridade;

    this.usuarioService.atualizar(this.usuario)
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
