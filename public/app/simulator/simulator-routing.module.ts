import { NgModule }             from '@angular/core';
import { Routes,
  RouterModule }         from '@angular/router';

import { SimulatorComponent }  from './simulator.component';

const routes: Routes = [

{
  path: '',
  component: SimulatorComponent,
  children: [
  {
    path: '',
    loadChildren: 'app/simulator/default/simulator-default.module#SimulatorDefaultModule'
  },
  {
    path: 'ground',
    loadChildren: 'app/simulator/ground/simulator-ground.module#SimulatorGroundModule'
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulatorRoutingModule { }
