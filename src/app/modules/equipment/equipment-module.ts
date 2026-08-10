import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EquipmentRoutingModule } from './equipment-routing-module';
import { EquipmentList } from './equipment-list/equipment-list';

@NgModule({
  declarations: [EquipmentList],
  imports: [CommonModule, RouterModule, EquipmentRoutingModule]
})
export class EquipmentModule { }
