
import {Product} from '../../product/entities/product.entity'
import {Warehouse} from '../../warehouse/entities/warehouse.entity'


export class ProductWarehouse {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
productId: string ;
warehouseId: string ;
allowNegativeStock: boolean ;
product?: Product ;
warehouse?: Warehouse ;
}
