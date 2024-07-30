import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryListComponent } from './delivery-list.component';
import { DeliveryService } from '../../services/delivery.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Delivery } from '../../models/delivery.model';

describe('DeliveryListComponent', () => {
  let component: DeliveryListComponent;
  let fixture: ComponentFixture<DeliveryListComponent>;
  let mockDeliveryService: jasmine.SpyObj<DeliveryService>;

  const mockDelivery: Delivery = {
    id: '1',
    documento: 'DOC123',
    motorista: { nome: 'João' },
    cliente_origem: { nome: 'Origem', endereco: 'Rua A', bairro: 'Bairro X', cidade: 'Cidade Y' },
    cliente_destino: { nome: 'Destino', endereco: 'Rua B', bairro: 'Bairro Z', cidade: 'Cidade W' },
    status_entrega: 'ENTREGUE'
  };

  beforeEach(async () => {
    mockDeliveryService = jasmine.createSpyObj('DeliveryService', ['getDeliveries']);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        NoopAnimationsModule,
        DeliveryListComponent
      ],
      providers: [
        { provide: DeliveryService, useValue: mockDeliveryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load deliveries on init', () => {
    const mockDeliveries: Delivery[] = [mockDelivery];
    mockDeliveryService.getDeliveries.and.returnValue(of(mockDeliveries));

    fixture.detectChanges();

    expect(component.deliveries).toEqual(mockDeliveries);
    expect(component.filteredDeliveries).toEqual(mockDeliveries);
  });

  it('should filter deliveries correctly', () => {
    component.deliveries = [
      { ...mockDelivery },
      { ...mockDelivery, id: '2', motorista: { nome: 'Maria' }, status_entrega: 'PENDENTE' },
      { ...mockDelivery, id: '3', status_entrega: 'PENDENTE' }
    ];
    component.selectedDriver = 'João';
    component.selectedStatus = 'PENDENTE';

    component.applyFilter();

    expect(component.filteredDeliveries.length).toBe(1);
    expect(component.filteredDeliveries[0].id).toBe('3');
  });

  it('should handle pagination correctly', () => {
    mockDeliveryService.getDeliveries.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    component.deliveries = Array(20).fill(null).map((_, i) => ({
      ...mockDelivery,
      id: i.toString(),
      motorista: { nome: 'Driver' + i }
    }));
    component.applyFilter();
    fixture.detectChanges();

    expect(component.pagedDeliveries.length).toBe(10);
    expect(component.pagedDeliveries[0].id).toBe('0');

    component.onPageChange({ pageIndex: 1, pageSize: 10, length: 20 } as PageEvent);
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.pagedDeliveries.length).toBe(10);
    expect(component.pagedDeliveries[0].id).toBe('10');
  });

  it('should get unique drivers', () => {
    component.deliveries = [
      { ...mockDelivery },
      { ...mockDelivery, id: '2', motorista: { nome: 'Maria' } },
      { ...mockDelivery, id: '3' }
    ];

    const drivers = component.getDrivers();

    expect(drivers).toEqual(['João', 'Maria']);
  });

  it('should get unique statuses', () => {
    component.deliveries = [
      { ...mockDelivery },
      { ...mockDelivery, id: '2', status_entrega: 'PENDENTE' },
      { ...mockDelivery, id: '3', status_entrega: 'PENDENTE' }
    ];

    const statuses = component.getStatuses();

    expect(statuses).toEqual(['ENTREGUE', 'PENDENTE']);
  });
});