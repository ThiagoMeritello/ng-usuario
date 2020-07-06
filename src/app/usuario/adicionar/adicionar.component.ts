import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Usuario } from '../models/usuario';

import { UsuarioService } from '../services/usuario.service';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  usuario: Usuario;
  usuarioForm: FormGroup;
  errors: any[] = [];
  dataAtual = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  escolaridades: any[] = [];
  
  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,
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
        required: 'Informe a Imagem',
        maxDate: 'Data de nascimento é maior que a data atual'
      },
      escolaridade: {
        required: 'Informe o Valor',
      }
    }
    super.configurarMensagensValidacaoBase(this.validationMessages);
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
    .map((esc) => {
      this.escolaridades.push(esc); 
    });

    console.log(new Date(this.dataAtual));
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.usuarioForm);
  }

  adicionarUsuario() {
    this.usuario = Object.assign({}, this.usuario, this.usuarioForm.value);

    this.usuario.escolaridade = +this.usuario.escolaridade;
    
    this.usuarioService.adicionar(this.usuario)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarFalha(falha) }
      );      
  }

  processarSucesso(response: any) {
    this.usuarioForm.reset();
    this.errors = [];

    this.mudancasNaoSalvar = false;

    let toast= this.toastr.success('Usuário cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/usuario/listar']);
      });
    }
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
