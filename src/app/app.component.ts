import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './services/api.service';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'machine-learning';

  constructor(
    private _api: ApiService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  private onDestroy$ = new Subject<any>();

  public meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  public pasajeros: { mes: string; pasajeros: number }[] = [];

  public resPasajeros: any;

  public form = this._fb.group({
    Enero: new FormControl('', [Validators.required]),
    Febrero: new FormControl('', [Validators.required]),
    Marzo: new FormControl('', [Validators.required]),
    Abril: new FormControl('', [Validators.required]),
    Mayo: new FormControl('', [Validators.required]),
    Junio: new FormControl('', [Validators.required]),
    Julio: new FormControl('', [Validators.required]),
    Agosto: new FormControl('', [Validators.required]),
    Septiembre: new FormControl('', [Validators.required]),
    Octubre: new FormControl('', [Validators.required]),
    Noviembre: new FormControl('', [Validators.required]),
    Diciembre: new FormControl('', [Validators.required]),
  });

  public formMes = this._fb.group({
    mes: new FormControl(this.meses[0], Validators.required),
    pasajeros: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  addPasajero() {
    try {
      if (this.formMes.invalid) throw 'Formulario inválido';
      this.pasajeros.push(this.formMes.value);
      this.formMes.reset();
      this.formMes.patchValue({ mes: this.meses[0] });
    } catch (error) {
      this._snackBar.open(error, '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }
  removePasajero(i: number) {
    this.pasajeros.splice(i, 1);
  }

  getPasajeros() {
    try {
      if (!this.pasajeros.length) throw 'No registro pasajeros en algún mes';
      let mapedPasajeros = this.pasajeros.map((pasajero) => [
        pasajero.mes,
        pasajero.pasajeros,
      ]);
      let Input = {
        Inputs: {
          input1: {
            ColumnsName: ['mes', 'pasajeros'],
            Values: mapedPasajeros,
          },
        },
      };
      console.log(Input);
      this._api
        .getPasajeros(Input)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (res) => {
            this.resPasajeros = res;
          },
          (error) => {
            this._snackBar.open(error, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          }
        );
    } catch (error) {
      this._snackBar.open(error, '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  get ColumnNames() {
    return this.resPasajeros.Results.output1.value.ColumnNames;
  }
  get Values() {
    return this.resPasajeros.Results.output1.value.Values;
  }
}
