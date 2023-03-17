/*************************************************************************************
 * Product: ADempiere gRPC Point Of Sales Client                                     *
 * Copyright (C) 2012-2023 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com                      *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                      *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program. If not, see <https://www.gnu.org/licenses/>.             *
 ************************************************************************************/

const { createClientRequest } = require('@adempiere/grpc-api/lib/clientRequest');
const { getMetadata } = require('@adempiere/grpc-api/src/utils/metadata.js');

class PointOfSales {

  /**
   * File on generated stub
   */
  stubFile = require('@adempiere/grpc-api/src/grpc/proto/point_of_sales_pb.js');

  /**
   * Constructor, No authentication required
   * @param {string} host
   * @param {string} version
   * @param {string} language
   */
  constructor(config) {
    if (config) {
      const adempiereConfig = config.adempiereApi.api;
      this.businessHost = adempiereConfig.businessHost;
      this.version = adempiereConfig.version;
      this.language = adempiereConfig.language;
      this.token = adempiereConfig.token;
    }

    this.initPointOfSalesService();
    console.log('ADempiere Point Of Sales Client Started');
  }

  // Init connection
  initPointOfSalesService() {
    const grpc = require('@grpc/grpc-js');
    const services = require('@adempiere/grpc-api/src/grpc/proto/point_of_sales_grpc_pb');
    this.pointOfSales = new services.StoreClient(
      this.businessHost,
      grpc.credentials.createInsecure()
    );
  }

  // Get PointOfSales Service
  getPointOfSalesService() {
    return this.pointOfSales;
  }

  //  List Point of Sales
  listPointOfSales({
    token,
    userUuid,
    //  Page Data
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListPointOfSalesRequest } = this.stubFile;
    const request = new ListPointOfSalesRequest()

    request.setUserUuid(userUuid)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listPointOfSales(
      request,
      metadata,
      callback
    );
  }

  //  Get Point of Sales
  getPointOfSales({
    token,
    posUuid,
    language
  }, callback) {
    const { PointOfSalesRequest } = this.stubFile;
    const request = new PointOfSalesRequest()
    request.setPosUuid(posUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getPointOfSales(
      request,
      metadata,
      callback
    );
  }

  //  Get Product Price
  getProductPrice({
    token,
    searchValue,
    upc,
    value,
    name,
    posUuid,
    businessPartnerUuid,
    validFrom,
    priceListUuid,
    warehouseUuid,
    language
  }, callback) {
    const { GetProductPriceRequest } = this.stubFile;
    const request = new GetProductPriceRequest()
    request.setSearchValue(searchValue)
    request.setUpc(upc)
    request.setValue(value)
    request.setName(name)
    request.setPosUuid(posUuid)
    request.setBusinessPartnerUuid(businessPartnerUuid)
    request.setPriceListUuid(priceListUuid)
    request.setWarehouseUuid(warehouseUuid)
    request.setValidFrom(validFrom)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getProductPrice(
      request,
      metadata,
      callback
    );
  }

  //  List Product Price
  listProductPrice({
    token,
    searchValue,
    posUuid,
    businessPartnerUuid,
    priceListUuid,
    warehouseUuid,
    validFrom,
    tableName,
    //  DSL
    filters,
    //  Custom Query
    query,
    whereClause,
    orderByClause,
    limit,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListProductPriceRequest } = this.stubFile;
    const request = new ListProductPriceRequest()
    request.setSearchValue(searchValue)
    request.setPosUuid(posUuid)
    request.setBusinessPartnerUuid(businessPartnerUuid)
    request.setPriceListUuid(priceListUuid)
    request.setWarehouseUuid(warehouseUuid)
    request.setValidFrom(validFrom)
    //
    const { convertCriteriaToGRPC } = require('../../lib/convertValues.js');
    //  TODO: Add support to all parameters
    request.setCriteria(convertCriteriaToGRPC({
      tableName,
      filters,
      query,
      whereClause,
      orderByClause,
      limit
    }))
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listProductPrice(
      request,
      metadata,
      callback
    );
  }

  //  Create Sales Order
  createOrder({
    token,
    posUuid,
    customerUuid,
    documentTypeUuid,
    warehouseUuid,
    priceListUuid,
    salesRepresentativeUuid,
    campaignUuid,
    language
  }, callback) {
    const { CreateOrderRequest } = this.stubFile;
    const request = new CreateOrderRequest()
    request.setPosUuid(posUuid)
    request.setCampaignUuid(campaignUuid)
    request.setCustomerUuid(customerUuid)
    request.setDocumentTypeUuid(documentTypeUuid)
    request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    if(warehouseUuid) {
      request.setWarehouseUuid(warehouseUuid)
    }
    if(priceListUuid) {
      request.setPriceListUuid(priceListUuid)
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createOrder(
      request,
      metadata,
      callback
    );
  }

  //  Release Sales Order
  releaseOrder({
    token,
    posUuid,
    orderUuid,
    salesRepresentativeUuid,
    language
  }, callback) {
    const { ReleaseOrderRequest } = this.stubFile;
    const request = new ReleaseOrderRequest()
    request.setPosUuid(posUuid)
    request.setOrderUuid(orderUuid)
    request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().releaseOrder(
      request,
      metadata,
      callback
    );
  }

  //  Hold Sales Order
  holdOrder({
    token,
    posUuid,
    orderUuid,
    salesRepresentativeUuid,
    language
  }, callback) {
    const { HoldOrderRequest } = this.stubFile;
    const request = new HoldOrderRequest()
    request.setPosUuid(posUuid)
    request.setOrderUuid(orderUuid)
    request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().holdOrder(
      request,
      metadata,
      callback
    );
  }

  //  Delete Sales Order
  deleteOrder({
    token,
    posUuid,
    orderUuid,
    language
  }, callback) {
    const { DeleteOrderRequest } = this.stubFile;
    const request = new DeleteOrderRequest()

    request.setPosUuid(posUuid);
    request.setOrderUuid(orderUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().deleteOrder(
      request,
      metadata,
      callback
    );
  }

  //  Create Sales Order Line
  createOrderLine({
    token,
    posUuid,
    orderUuid,
    productUuid,
    chargeUuid,
    resourceAssignmentUuid,
    description,
    quantity,
    price,
    discountRate,
    warehouseUuid,
    language
  }, callback) {
    const { CreateOrderLineRequest } = this.stubFile;
    const request = new CreateOrderLineRequest()
    const { getDecimalFromNumber } = require('../../lib/convertValues.js')

    request.setPosUuid(posUuid);
    request.setOrderUuid(orderUuid)
    request.setProductUuid(productUuid)
    request.setChargeUuid(chargeUuid)
    request.setResourceAssignmentUuid(resourceAssignmentUuid);
    request.setDescription(description)
    if(quantity) {
      request.setQuantity(getDecimalFromNumber(quantity))
    }
    if(price) {
      request.setPrice(getDecimalFromNumber(price))
    }
    if(discountRate) {
      request.setDiscountRate(getDecimalFromNumber(discountRate))
    }
    if(warehouseUuid) {
      request.setWarehouseUuid(warehouseUuid)
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createOrderLine(
      request,
      metadata,
      callback
    );
  }

  //  Delete Sales Order Line
  deleteOrderLine({
    token,
    posUuid,
    orderLineUuid,
    language
  }, callback) {
    const { DeleteOrderLineRequest } = this.stubFile;
    const request = new DeleteOrderLineRequest()

    request.setPosUuid(posUuid);
    request.setOrderLineUuid(orderLineUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().deleteOrderLine(
      request,
      metadata,
      callback
    );
  }

  //  Update Sales Order
  updateOrder({
    token,
    orderUuid,
    posUuid,
    customerUuid,
    documentTypeUuid,
    warehouseUuid,
    priceListUuid,
    description,
    campaignUuid,
    discountRate,
    discountRateOff,
    discountAmountOff,
    salesRepresentativeUuid,
    language
  }, callback) {
    const { UpdateOrderRequest } = this.stubFile;
    const { getDecimalFromNumber } = require('../../lib/convertValues.js')
    const request = new UpdateOrderRequest()
    request.setOrderUuid(orderUuid)
    request.setCampaignUuid(campaignUuid)
    request.setPosUuid(posUuid)
    request.setCustomerUuid(customerUuid)
    request.setDocumentTypeUuid(documentTypeUuid)
    request.setDescription(description)
    request.setDiscountRate(getDecimalFromNumber(discountRate))
    request.setDiscountRateOff(getDecimalFromNumber(discountRateOff))
    request.setDiscountAmountOff(getDecimalFromNumber(discountAmountOff))
    request.setSalesRepresentativeUuid(salesRepresentativeUuid);

    if(warehouseUuid) {
      request.setWarehouseUuid(warehouseUuid)
    }
    if(priceListUuid) {
      request.setPriceListUuid(priceListUuid)
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().updateOrder(
      request,
      metadata,
      callback
    );
  }

  //  Update Sales Order Line
  updateOrderLine({
    token,
    posUuid,
    orderLineUuid,
    description,
    quantity,
    uomUuid,
    price,
    discountRate,
    isAddQuantity,
    warehouseUuid,
    language
  }, callback) {
    const { UpdateOrderLineRequest } = this.stubFile;
    const { getDecimalFromNumber } = require('@adempiere/grpc-api/lib/convertValues.js');
    const request = new UpdateOrderLineRequest();
    
    request.setPosUuid(posUuid);
    request.setOrderLineUuid(orderLineUuid)
    request.setDescription(description)
    request.setQuantity(getDecimalFromNumber(quantity))
    request.setPrice(getDecimalFromNumber(price))
    request.setDiscountRate(getDecimalFromNumber(discountRate))
    request.setWarehouseUuid(warehouseUuid)
    request.setIsAddQuantity(isAddQuantity)
    request.setUomUuid(uomUuid);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().updateOrderLine(
      request,
      metadata,
      callback
    );
  }

  //  Get Sales Order
  getOrder({
    token,
    posUuid,
    orderUuid,
    language
  }, callback) {
    const { GetOrderRequest } = this.stubFile;
    const request = new GetOrderRequest()

    request.setPosUuid(posUuid);
    request.setOrderUuid(orderUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getOrder(
      request,
      metadata,
      callback
    );
  }

  //  List Orders
  listOrders({
    token,
    posUuid,
    documentNo,
    businessPartnerUuid,
    grandTotal,
    openAmount,
    isWaitingForPay,
    isOnlyProcessed,
    isOnlyAisleSeller,
    isWaitingForInvoice,
    isWaitingForShipment,
    dateOrderedFrom,
    dateOrderedTo,
    salesRepresentativeUuid,
    tableName,
    //  DSL
    filters,
    //  Custom Query
    query,
    whereClause,
    orderByClause,
    limit,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListOrdersRequest } = this.stubFile;
    const request = new ListOrdersRequest()
    const { convertCriteriaToGRPC, getDecimalFromNumber } = require('../../lib/convertValues.js')
    request.setCriteria(convertCriteriaToGRPC({
      tableName,
      filters,
      query,
      whereClause,
      orderByClause,
      limit
    }))
    request.setPosUuid(posUuid)
    request.setDocumentNo(documentNo)
    request.setBusinessPartnerUuid(businessPartnerUuid)
    if(grandTotal) {
      request.setGrandTotal(getDecimalFromNumber(grandTotal))
    }
    if(openAmount) {
      request.setOpenAmount(getDecimalFromNumber(openAmount))
    }
    //  Date Order From
    if (dateOrderedFrom) {
      request.setDateOrderedFrom(dateOrderedFrom)
    }
    //  Date Order To
    if (dateOrderedTo) {
      request.setDateOrderedTo(dateOrderedTo)
    }
    request.setIsWaitingForPay(isWaitingForPay)
    request.setIsOnlyProcessed(isOnlyProcessed)
    request.setIsOnlyAisleSeller(isOnlyAisleSeller)
    request.setIsWaitingForInvoice(isWaitingForInvoice)
    request.setIsWaitingForShipment(isWaitingForShipment)
    request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listOrders(
      request,
      metadata,
      callback
    );
  }

  //  List Sales Order Lines
  listOrderLines({
    token,
    posUuid,
    orderUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListOrderLinesRequest } = this.stubFile;
    const request = new ListOrderLinesRequest()

    request.setPosUuid(posUuid);
    request.setOrderUuid(orderUuid)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listOrderLines(
      request,
      metadata,
      callback
    );
  }

  //  Create Shipment
  createShipment({
    token,
    posUuid,
    orderUuid,
    salesRepresentativeUuid,
    isCreateLinesFromOrder,
    language
  }, callback) {
    const { CreateShipmentRequest } = this.stubFile;
    const request = new CreateShipmentRequest();

    request.setPosUuid(posUuid);
    request.setOrderUuid(orderUuid);
    request.setIsCreateLinesFromOrder(isCreateLinesFromOrder);
    request.setSalesRepresentativeUuid(salesRepresentativeUuid);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createShipment(
      request,
      metadata,
      callback
    );
  }

    //  Create Shipment Line
  createShipmentLine({
    token,
    posUuid,
    shipmentUuid,
    orderLineUuid,
    description,
    quantity,
    language
  }, callback) {
    const { CreateShipmentLineRequest } = this.stubFile;
    const request = new CreateShipmentLineRequest()
    const { getDecimalFromNumber } = require('../../lib/convertValues.js')

    request.setPosUuid(posUuid);
    request.setShipmentUuid(shipmentUuid)
    request.setOrderLineUuid(orderLineUuid)
    request.setDescription(description)
    if(quantity) {
      request.setQuantity(getDecimalFromNumber(quantity))
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createShipmentLine(
      request,
      metadata,
      callback
    );
  }

  //  Delete Shipment Line
  deleteShipmentLine({
    token,
    posUuid,
    shipmentLineUuid,
    language
  }, callback) {
    const { DeleteShipmentLineRequest } = this.stubFile;
    const request = new DeleteShipmentLineRequest()

    request.setPosUuid(posUuid);
    request.setShipmentLineUuid(shipmentLineUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().deleteShipmentLine(
      request,
      metadata,
      callback
    );
  }

  //  List Shipment Lines
  listShipmentLines({
    token,
    posUuid,
    shipmentUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListShipmentLinesRequest } = this.stubFile;
    const request = new ListShipmentLinesRequest()

    request.setPosUuid(posUuid);
    request.setShipmentUuid(shipmentUuid)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listShipmentLines(
      request,
      metadata,
      callback
    );
  }

  //  Process Shipment
  processShipment({
    token,
    posUuid,
    shipmentUuid,
    description,
    documentAction,
    language
  }, callback) {
    const { ProcessShipmentRequest } = this.stubFile;
    const request = new ProcessShipmentRequest()

    request.setPosUuid(posUuid);
    request.setShipmentUuid(shipmentUuid)
    request.setDescription(description)
    request.setDocumentAction(documentAction)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().processShipment(
      request,
      metadata,
      callback
    );
  }

  //  Reverse Sales transaction
  reverseSales({
    token,
    posUuid,
    orderUuid,
    description,
    language
  }, callback) {
    const { ReverseSalesRequest } = this.stubFile;
    const request = new ReverseSalesRequest()
    request.setOrderUuid(orderUuid)
    request.setPosUuid(posUuid)
    request.setDescription(description)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().reverseSales(
      request,
      metadata,
      callback
    );
  }

  //  Payments
  //  Create Payment
  createPayment({
    token,
    posUuid,
    orderUuid,
    chargeUuid,
    collectingAgentUuid,
    invoiceUuid,
    bankUuid,
    referenceNo,
    description,
    amount,
    paymentDate,
    paymentAccountDate,
    tenderTypeCode,
    currencyUuid,
    paymentMethodUuid,
    isRefund,
    referenceBankAccountUuid,
    language
  }, callback) {
    const { CreatePaymentRequest } = this.stubFile;
    const { getDecimalFromNumber } = require('@adempiere/grpc-api/lib/convertValues.js');
    const request = new CreatePaymentRequest()

    request.setPosUuid(posUuid)
    if(orderUuid) {
      request.setOrderUuid(orderUuid)
    }
    if(chargeUuid) {
      request.setChargeUuid(chargeUuid)
    }
    if(collectingAgentUuid) {
      request.setCollectingAgentUuid(collectingAgentUuid)
    }
    if (bankUuid) {
      request.setBankUuid(bankUuid)
    }
    if (invoiceUuid) {
      request.setInvoiceUuid(invoiceUuid)
    }
    if (referenceNo) {
      request.setReferenceNo(referenceNo)
    }
    if (description) {
      request.setDescription(description)
    }
    if (tenderTypeCode) {
      request.setTenderTypeCode(tenderTypeCode)
    }
    if(paymentMethodUuid) {
      request.setPaymentMethodUuid(paymentMethodUuid)
    }
    if (currencyUuid) {
      request.setCurrencyUuid(currencyUuid)
    }
    if(amount) {
      request.setAmount(getDecimalFromNumber(amount))
    }
    //  Date of Payment
    if (paymentDate) {
      request.setPaymentDate(paymentDate)
    }
    request.setIsRefund(isRefund)
    if (paymentAccountDate) {
      request.setPaymentAccountDate(paymentAccountDate)
    }
    request.setReferenceBankAccountUuid(referenceBankAccountUuid);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createPayment(
      request,
      metadata,
      callback
    );
  }

  //  Create Payment Refund Reference
  createPaymentReference({
    token,
    posUuid,
    orderUuid,
    salesRepresentativeUuid,
    customerBankAccountUuid,
    customerUuid,
    description,
    amount,
    sourceAmount,
    isReceipt,
    paymentDate,
    paymentAccountDate,
    tenderTypeCode,
    currencyUuid,
    conversionTypeUuid,
    paymentMethodUuid,
    language
  }, callback) {
    const { CreatePaymentReferenceRequest } = this.stubFile;
    const { getDecimalFromNumber } = require('../../lib/convertValues.js')
    const request = new CreatePaymentReferenceRequest()
    request.setPosUuid(posUuid)
    request.setOrderUuid(orderUuid)
    if(salesRepresentativeUuid) {
      request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    }
    if(customerBankAccountUuid) {
      request.setCustomerBankAccountUuid(customerBankAccountUuid)
    }
    request.setCustomerUuid(customerUuid)
    if (description) {
      request.setDescription(description)
    }
    if (tenderTypeCode) {
      request.setTenderTypeCode(tenderTypeCode)
    }
    if(paymentMethodUuid) {
      request.setPaymentMethodUuid(paymentMethodUuid)
    }
    if(conversionTypeUuid) {
      request.setConversionTypeUuid(conversionTypeUuid)
    }
    if (currencyUuid) {
      request.setCurrencyUuid(currencyUuid)
    }
    if(amount) {
      request.setAmount(getDecimalFromNumber(amount))
    }
    if(sourceAmount) {
      request.setSourceAmount(getDecimalFromNumber(sourceAmount))
    }
    request.setIsReceipt(isReceipt)
    //  Date of Payment
    if (paymentDate) {
      request.setPaymentDate(paymentDate)
    }
    if (paymentAccountDate) {
      request.setPaymentAccountDate(paymentAccountDate)
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createPaymentReference(
      request,
      metadata,
      callback
    );
  }

  //  Update Payment
  updatePayment({
    token,
    posUuid,
    paymentUuid,
    bankUuid,
    referenceNo,
    description,
    amount,
    paymentDate,
    tenderTypeCode,
    paymentMethodUuid,
    paymentAccountDate,
    referenceBankAccountUuid,
    language
  }, callback) {
    const { UpdatePaymentRequest } = this.stubFile;
    const { getDecimalFromNumber } = require('@adempiere/grpc-api/lib/convertValues.js');
    const request = new UpdatePaymentRequest();

    request.setPosUuid(posUuid);
    request.setPaymentUuid(paymentUuid)
    if (bankUuid) {
      request.setBankUuid(bankUuid)
    }
    if (referenceNo) {
      request.setReferenceNo(referenceNo)
    }
    if (description) {
      request.setDescription(description)
    }
    if (tenderTypeCode) {
      request.setTenderTypeCode(tenderTypeCode)
    }
    if(paymentMethodUuid) {
      request.setPaymentMethodUuid(paymentMethodUuid)
    }
    if(amount) {
      request.setAmount(getDecimalFromNumber(amount))
    }
    //  Date of Payment
    if (paymentDate) {
      request.setPaymentDate(paymentDate)
    }
    if (paymentAccountDate) {
      request.setPaymentAccountDate(paymentAccountDate)
    }
    request.setReferenceBankAccountUuid(referenceBankAccountUuid);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().updatePayment(
      request,
      metadata,
      callback
    );
  }

  //  List Cash summary movements
  listCashSummaryMovements({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListCashSummaryMovementsRequest } = this.stubFile;
    const request = new ListCashSummaryMovementsRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listCashSummaryMovements(
      request,
      metadata,
      callback
    );
  }

  //  Cash Closing
  processCashClosing({
    token,
    posUuid,
    uuid,
    id,
    language
  }, callback) {
    const { CashClosingRequest } = this.stubFile;
    const request = new CashClosingRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    if (uuid) {
      request.setUuid(uuid)
    }
    request.setId(id)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().processCashClosing(
      request,
      metadata,
      callback
    );
  }

  //  Cash Opening service
  processCashOpening({
    token,
    posUuid,
    collectingAgentUuid,
    description,
    payments,
    language
  }, callback) {
    const { CashOpeningRequest, CreatePaymentRequest } = this.stubFile;
    const { convertValueToGRPC, getDecimalFromNumber } = require('../../lib/convertValues.js')
    const request = new CashOpeningRequest()
    request.setPosUuid(posUuid)
    request.setCollectingAgentUuid(collectingAgentUuid)
    request.setDescription(description)
      //  Set payment data
    payments.forEach(payment => {
      const paymentRequest = new CreatePaymentRequest()
      if (payment.uuid) {
        paymentRequest.setUuid(payment.uuid)
      }
      paymentRequest.setId(payment.id)
      if(payment.chargeUuid) {
        paymentRequest.setChargeUuid(payment.chargeUuid)
      }
      if (payment.bankUuid) {
        paymentRequest.setBankUuid(payment.bankUuid)
      }
      if (payment.collectingAgentUuid) {
        paymentRequest.setCollectingAgentUuid(payment.collectingAgentUuid)
      }
      paymentRequest.setIsRefund(false)
      if (payment.invoiceUuid) {
        paymentRequest.setInvoiceUuid(payment.invoiceUuid)
      }
      if (payment.referenceNo) {
        paymentRequest.setReferenceNo(payment.referenceNo)
      }
      if (payment.description) {
        paymentRequest.setDescription(payment.description)
      }
      if (payment.tenderTypeCode) {
        paymentRequest.setTenderTypeCode(payment.tenderTypeCode)
      }
      if (payment.currencyUuid) {
        paymentRequest.setCurrencyUuid(payment.currencyUuid)
      }
      if(payment.amount) {
        paymentRequest.setAmount(getDecimalFromNumber(payment.amount))
      }
      if (payment.paymentDate) {
        paymentRequest.setPaymentDate(convertValueToGRPC({
          value: payment.paymentDate
        }))
      }
      request.addPayments(paymentRequest)
    })
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().processCashOpening(
      request,
      metadata,
      callback
    );
  }

    //  Cash Withdrawal service
  processCashWithdrawal({
    token,
    posUuid,
    collectingAgentUuid,
    description,
    payments,
    language
  }, callback) {
    const { CashWithdrawalRequest, CreatePaymentRequest } = this.stubFile;
    const { convertValueToGRPC, getDecimalFromNumber } = require('../../lib/convertValues.js')
    const request = new CashWithdrawalRequest()
    request.setPosUuid(posUuid)
    request.setCollectingAgentUuid(collectingAgentUuid)
    request.setDescription(description)
      //  Set payment data
    payments.forEach(payment => {
      const paymentRequest = new CreatePaymentRequest()
      if (payment.uuid) {
        paymentRequest.setUuid(payment.uuid)
      }
      paymentRequest.setId(payment.id)
      if(payment.chargeUuid) {
        paymentRequest.setChargeUuid(payment.chargeUuid)
      }
      if (payment.bankUuid) {
        paymentRequest.setBankUuid(payment.bankUuid)
      }
      if (payment.collectingAgentUuid) {
        paymentRequest.setCollectingAgentUuid(payment.collectingAgentUuid)
      }
      paymentRequest.setIsRefund(true)
      if (payment.invoiceUuid) {
        paymentRequest.setInvoiceUuid(payment.invoiceUuid)
      }
      if (payment.referenceNo) {
        paymentRequest.setReferenceNo(payment.referenceNo)
      }
      if (payment.description) {
        paymentRequest.setDescription(payment.description)
      }
      if (payment.tenderTypeCode) {
        paymentRequest.setTenderTypeCode(payment.tenderTypeCode)
      }
      if (payment.currencyUuid) {
        paymentRequest.setCurrencyUuid(payment.currencyUuid)
      }
      if(payment.amount) {
        paymentRequest.setAmount(getDecimalFromNumber(payment.amount))
      }
      if (payment.paymentDate) {
        paymentRequest.setPaymentDate(convertValueToGRPC({
          value: payment.paymentDate
        }))
      }
      request.addPayments(paymentRequest)
    })
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().processCashWithdrawal(
      request,
      metadata,
      callback
    );
  }

  //  allocate Seller
  allocateSeller({
    token,
    posUuid,
    salesRepresentativeUuid,
    language
  }, callback) {
    const { AllocateSellerRequest } = this.stubFile;
    const request = new AllocateSellerRequest()
    request.setPosUuid(posUuid)
    request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().allocateSeller(
      request,
      metadata,
      callback
    );
  }

  //  deallocate Seller
  deallocateSeller({
    token,
    posUuid,
    salesRepresentativeUuid,
    language
  }, callback) {
    const { DeallocateSellerRequest } = this.stubFile;
    const request = new DeallocateSellerRequest()
    request.setPosUuid(posUuid)
    request.setSalesRepresentativeUuid(salesRepresentativeUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().allocateSeller(
      request,
      metadata,
      callback
    );
  }

  //  Delete Payment
  deletePayment({
    token,
    posUuid,
    paymentUuid,
    language
  }, callback) {
    const { DeletePaymentRequest } = this.stubFile;
    const request = new DeletePaymentRequest()

    request.setPosUuid(posUuid);
    request.setPaymentUuid(paymentUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().deletePayment(
      request,
      metadata,
      callback
    );
  }

  //  Delete Refund Reference
  deletePaymentReference({
    token,
    posUuid,
    uuid,
    id,
    language
  }, callback) {
    const { DeletePaymentReferenceRequest } = this.stubFile;
    const request = new DeletePaymentReferenceRequest()

    request.setPosUuid(posUuid);
    request.setUuid(uuid)
    request.setId(id)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().deletePaymentReference(
      request,
      metadata,
      callback
    );
  }

  //  List Payments
  listPayments({
    token,
    posUuid,
    orderUuid,
    isOnlyRefund,
    isOnlyReceipt,
    tableName,
    //  DSL
    filters,
    //  Custom Query
    query,
    whereClause,
    orderByClause,
    limit,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListPaymentsRequest } = this.stubFile;
    const { convertCriteriaToGRPC } = require('../../lib/convertValues.js')
    const request = new ListPaymentsRequest()
    request.setCriteria(convertCriteriaToGRPC({
      tableName,
      filters,
      query,
      whereClause,
      orderByClause,
      limit
    }))
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    if (orderUuid) {
      request.setOrderUuid(orderUuid)
    }
    request.setIsOnlyRefund(isOnlyRefund)
    request.setIsOnlyReceipt(isOnlyReceipt)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listPayments(
      request,
      metadata,
      callback
    );
  }

  //  Create Payment
  processOrder({
    token,
    posUuid,
    orderUuid,
    isOpenRefund,
    payments,
    language
  }, callback) {
    const { CreatePaymentRequest, ProcessOrderRequest } = this.stubFile;
    const { convertValueToGRPC, getDecimalFromNumber } = require('../../lib/convertValues.js')
    const request = new ProcessOrderRequest()
    request.setPosUuid(posUuid)
    request.setOrderUuid(orderUuid)
    request.setIsOpenRefund(isOpenRefund)
    //  Set payment data
    payments.forEach(payment => {
      const paymentRequest = new CreatePaymentRequest()
      if (payment.uuid) {
        paymentRequest.setUuid(payment.uuid)
      }
      paymentRequest.setId(payment.id)
      if (payment.orderUuid) {
        paymentRequest.setOrderUuid(payment.orderUuid)
      }
      if (payment.bankUuid) {
        paymentRequest.setBankUuid(payment.bankUuid)
      }
      paymentRequest.setIsRefund(payment.isRefund)
      if (payment.collectingAgentUuid) {
        paymentRequest.setCollectingAgentUuid(payment.collectingAgentUuid)
      }
      if (payment.invoiceUuid) {
        paymentRequest.setInvoiceUuid(payment.invoiceUuid)
      }
      if (payment.referenceNo) {
        paymentRequest.setReferenceNo(payment.referenceNo)
      }
      if (payment.description) {
        paymentRequest.setDescription(payment.description)
      }
      if (payment.tenderTypeCode) {
        paymentRequest.setTenderTypeCode(payment.tenderTypeCode)
      }
      if (payment.currencyUuid) {
        paymentRequest.setCurrencyUuid(payment.currencyUuid)
      }
      if(payment.amount) {
        paymentRequest.setAmount(getDecimalFromNumber(payment.amount))
      }
      if (payment.paymentDate) {
        paymentRequest.setPaymentDate(convertValueToGRPC({
          value: payment.paymentDate
        }))
      }
      request.addPayments(paymentRequest)
    })
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().processOrder(
      request,
      metadata,
      callback
    );
  }

  //  Get Sales Order
  getKeyLayout({
    token,
    posUuid,
    keyLayoutUuid,
    language
  }, callback) {
    const { GetKeyLayoutRequest } = this.stubFile;
    const request = new GetKeyLayoutRequest()

    request.setPosUuid(posUuid);
    request.setKeyLayoutUuid(keyLayoutUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getKeyLayout(
      request,
      metadata,
      callback
    );
  }

  //  Validate User PIN
  validatePIN({
    token,
    posUuid,
    pin,
    requestedAccess,
    requestedAmount,
    language
  }, callback) {
    const { ValidatePINRequest } = this.stubFile;
    const { getDecimalFromNumber } = require('../../lib/convertValues.js')
    const request = new ValidatePINRequest()

    request.setRequestedAccess(requestedAccess);
    if(requestedAmount) {
      request.setRequestedAmount(getDecimalFromNumber(requestedAmount))
    }
    request.setPin(pin)
    request.setPosUuid(posUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().validatePIN(
      request,
      metadata,
      callback
    );
  }

  //  List Available Warehouses
  listAvailableWarehouses({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailableWarehousesRequest } = this.stubFile;
    const request = new ListAvailableWarehousesRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailableWarehouses(
      request,
      metadata,
      callback
    );
  }

  //  List Available Tender Types
  listAvailablePaymentMethods({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailablePaymentMethodsRequest } = this.stubFile;
    const request = new ListAvailablePaymentMethodsRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailablePaymentMethods(
      request,
      metadata,
      callback
    );
  }

  //  List Available Price List
  listAvailablePriceList({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailablePriceListRequest } = this.stubFile;
    const request = new ListAvailablePriceListRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailablePriceList(
      request,
      metadata,
      callback
    );
  }

  //  List Available Price List
  listAvailableCurrencies({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailableCurrenciesRequest } = this.stubFile;
    const request = new ListAvailableCurrenciesRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailableCurrencies(
      request,
      metadata,
      callback
    );
  }

  //  List Available Document Types
  listAvailableDocumentTypes({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailableDocumentTypesRequest } = this.stubFile;
    const request = new ListAvailableDocumentTypesRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailableDocumentTypes(
      request,
      metadata,
      callback
    );
  }

  //  Create Customer from POS
  createCustomer({
    token,
    value,
    taxId,
    duns,
    naics,
    name,
    lastName,
    description,
    posUuid,
    businessPartnerGroupUuid,
    addresses,
    additionalAttributes,
    language
  }, callback) {
    const { CreateCustomerRequest, AddressRequest } = this.stubFile;
    const { convertParameterToGRPC } = require('../../lib/convertValues.js');
    const request = new CreateCustomerRequest()
    request.setValue(value)
    request.setTaxId(taxId)
    request.setDuns(duns)
    request.setNaics(naics)
    request.setName(name)
    request.setLastName(lastName)
    request.setDescription(description)
    request.setPosUuid(posUuid)
    request.setBusinessPartnerGroupUuid(businessPartnerGroupUuid)
    if(additionalAttributes) {
      additionalAttributes.forEach(attribute => {
        request.addAdditionalAttributes(convertParameterToGRPC({
          columnName: attribute.key,
          value: attribute.value
        }))
      })
    }
    if(addresses) {
      addresses.forEach(address => {
        const addressRequest = new AddressRequest()
        addressRequest.setFirstName(address.firstName)
        addressRequest.setLastName(address.lastName)
        addressRequest.setDescription(address.description)
        addressRequest.setContactName(address.contactName)
        addressRequest.setEmail(address.email)
        addressRequest.setPhone(address.phone)
        addressRequest.setAddress1(address.address1)
        addressRequest.setAddress2(address.address2)
        addressRequest.setAddress3(address.address3)
        addressRequest.setAddress4(address.address4)
        addressRequest.setCityUuid(address.cityUuid)
        addressRequest.setCityName(address.cityName)
        addressRequest.setPostalCode(address.postalCode)
        addressRequest.setRegionUuid(address.regionUuid)
        addressRequest.setRegionName(address.regionName)
        addressRequest.setCountryUuid(address.countryUuid)
        addressRequest.setIsDefaultBilling(address.isDefaultBilling)
        addressRequest.setIsDefaultShipping(address.isDefaultShipping)
        if(address.additionalAttributes) {
          address.additionalAttributes.forEach(attribute => {
            addressRequest.addAdditionalAttributes(convertParameterToGRPC({
              columnName: attribute.key,
              value: attribute.value
            }))
          })
        }
        request.addAddresses(addressRequest)
      })
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createCustomer(
      request,
      metadata,
      callback
    );
  }

  //  Update Customer from POS
  updateCustomer({
    token,
    posUuid,
    uuid,
    value,
    taxId,
    duns,
    naics,
    name,
    lastName,
    description,
    addresses,
    additionalAttributes,
    language
  }, callback) {
    const { UpdateCustomerRequest, AddressRequest } = this.stubFile;
    const { convertParameterToGRPC } = require('../../lib/convertValues.js');
    const request = new UpdateCustomerRequest()

    request.setPosUuid(posUuid);
    request.setUuid(uuid)
    request.setValue(value)
    request.setTaxId(taxId)
    request.setDuns(duns)
    request.setNaics(naics)
    request.setName(name)
    request.setLastName(lastName)
    request.setDescription(description)
    if(additionalAttributes) {
      additionalAttributes.forEach(attribute => {
        request.addAdditionalAttributes(convertParameterToGRPC({
          columnName: attribute.key,
          value: attribute.value
        }))
      })
    }
    if(addresses) {
      addresses.forEach(address => {
        const addressRequest = new AddressRequest()
        addressRequest.setFirstName(address.firstName)
        addressRequest.setLastName(address.lastName)
        addressRequest.setDescription(address.description)
        addressRequest.setContactName(address.contactName)
        addressRequest.setEmail(address.email)
        addressRequest.setPhone(address.phone)
        addressRequest.setAddress1(address.address1)
        addressRequest.setAddress2(address.address2)
        addressRequest.setAddress3(address.address3)
        addressRequest.setAddress4(address.address4)
        addressRequest.setCityUuid(address.cityUuid)
        addressRequest.setCityName(address.cityName)
        addressRequest.setPostalCode(address.postalCode)
        addressRequest.setRegionUuid(address.regionUuid)
        addressRequest.setRegionName(address.regionName)
        addressRequest.setCountryUuid(address.countryUuid)
        addressRequest.setIsDefaultBilling(address.isDefaultBilling)
        addressRequest.setIsDefaultShipping(address.isDefaultShipping)
        addressRequest.setUuid(address.uuid)
        if(address.additionalAttributes) {
          address.additionalAttributes.forEach(attribute => {
            addressRequest.addAdditionalAttributes(convertParameterToGRPC({
              columnName: attribute.key,
              value: attribute.value
            }))
          })
        }
        request.addAddresses(addressRequest)
      })
    }
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().updateCustomer(
      request,
      metadata,
      callback
    );
  }

  //  Get Customer
  getCustomer({
    token,
    posUuid,
    searchValue,
    value,
    name,
    contactName,
    email,
    postalCode,
    phone,
    language
  }, callback) {
    const { GetCustomerRequest } = this.stubFile;
    const request = new GetCustomerRequest()

    request.setPosUuid(posUuid);
    request.setSearchValue(searchValue)
    request.setValue(value)
    request.setName(name)
    request.setContactName(contactName)
    request.setEmail(email)
    request.setPostalCode(postalCode)
    request.setPhone(phone)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getCustomer(
      request,
      metadata,
      callback
    );
  }

  //  Get Customer Bank Account
  getCustomerBankAccount({
    token,
    posUuid,
    customerBankAccountUuid,
    language
  }, callback) {
    const { GetCustomerBankAccountRequest } = this.stubFile;
    const request = new GetCustomerBankAccountRequest()

    request.setPosUuid(posUuid);
    request.setCustomerBankAccountUuid(customerBankAccountUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getCustomerBankAccount(
      request,
      metadata,
      callback
    );
  }

  //  Create Customer Bank Account
  createCustomerBankAccount({
    token,
    customerUuid,
    posUuid,
    city,
    country,
    email,
    driverLicense,
    socialSecurityNumber,
    name,
    state,
    street,
    zip,
    bankAccountType,
    bankUuid,
    isAch,
    addressVerified,
    zipVerified,
    routingNo,
    iban,
    isPayrollAccount,
    accountNo,
    language
  }, callback) {
    const { CreateCustomerBankAccountRequest } = this.stubFile;
    const request = new CreateCustomerBankAccountRequest()
    request.setCustomerUuid(customerUuid)
    request.setPosUuid(posUuid)
    request.setCity(city)
    request.setCountry(country)
    request.setDriverLicense(driverLicense)
    request.setSocialSecurityNumber(socialSecurityNumber)
    request.setName(name)
    request.setState(state)
    request.setStreet(street)
    request.setZip(zip)
    request.setBankAccountType(bankAccountType)
    request.setBankUuid(bankUuid)
    request.setIsAch(isAch)
    request.setAddressVerified(addressVerified)
    request.setZipVerified(zipVerified)
    request.setRoutingNo(routingNo)
    request.setIban(iban)
    request.setIsPayrollAccount(isPayrollAccount)
    request.setEmail(email)
    request.setAccountNo(accountNo)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().createCustomerBankAccount(
      request,
      metadata,
      callback
    );
  }

  //  Update Customer Bank Account
  updateCustomerBankAccount({
    token,
    customerBankAccountUuid,
    posUuid,
    city,
    country,
    email,
    driverLicense,
    socialSecurityNumber,
    name,
    state,
    street,
    zip,
    bankAccountType,
    bankUuid,
    isAch,
    addressVerified,
    zipVerified,
    routingNo,
    iban,
    isPayrollAccount,
    accountNo,
    language
  }, callback) {
    const { UpdateCustomerBankAccountRequest } = this.stubFile;
    const request = new UpdateCustomerBankAccountRequest()
    request.setCustomerBankAccountUuid(customerBankAccountUuid)
    request.setPosUuid(posUuid)
    request.setCity(city)
    request.setCountry(country)
    request.setDriverLicense(driverLicense)
    request.setSocialSecurityNumber(socialSecurityNumber)
    request.setName(name)
    request.setState(state)
    request.setStreet(street)
    request.setZip(zip)
    request.setBankAccountType(bankAccountType)
    request.setBankUuid(bankUuid)
    request.setIsAch(isAch)
    request.setAddressVerified(addressVerified)
    request.setZipVerified(zipVerified)
    request.setRoutingNo(routingNo)
    request.setIban(iban)
    request.setIsPayrollAccount(isPayrollAccount)
    request.setEmail(email)
    request.setAccountNo(accountNo)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().updateCustomerBankAccount(
      request,
      metadata,
      callback
    );
  }

  //  Get Customer Bank Accoount
  getCustomerBankAccount({
    token,
    posUuid,
    customerBankAccountUuid,
    language
  }, callback) {
    const { GetCustomerBankAccountRequest } = this.stubFile;
    const request = new GetCustomerBankAccountRequest()

    request.setPosUuid(posUuid);
    request.setCustomerBankAccountUuid(customerBankAccountUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getCustomerBankAccount(
      request,
      metadata,
      callback
    );
  }

  //  Delete Customer Bank Accoount
  deleteCustomerBankAccount({
    token,
    posUuid,
    customerBankAccountUuid,
    language
  }, callback) {
    const { DeleteCustomerBankAccountRequest } = this.stubFile;
    const request = new DeleteCustomerBankAccountRequest()

    request.setPosUuid(posUuid);
    request.setCustomerBankAccountUuid(customerBankAccountUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().deleteCustomerBankAccount(
      request,
      metadata,
      callback
    );
  }

  //  List Customer Bank Accounts
  listCustomerBankAccounts({
    token,
    posUuid,
    customerUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListCustomerBankAccountsRequest } = this.stubFile;
    const request = new ListCustomerBankAccountsRequest()

    request.setPosUuid(posUuid);
    request.setCustomerUuid(customerUuid)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listCustomerBankAccounts(
      request,
      metadata,
      callback
    );
  }

  //  List Customer Refund References
  listPaymentReferences({
    token,
    posUuid,
    orderUuid,
    customerUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListPaymentReferencesRequest } = this.stubFile;
    const request = new ListPaymentReferencesRequest()
    request.setCustomerUuid(customerUuid)
    request.setPosUuid(posUuid)
    request.setOrderUuid(orderUuid)
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listPaymentReferences(
      request,
      metadata,
      callback
    );
  }

  //  Get Available Refund
  getAvailableRefund({
    token,
    posUuid,
    date,
    language
  }, callback) {
    const { GetAvailableRefundRequest } = this.stubFile;
    const request = new GetAvailableRefundRequest()
    if (date) {
      request.setDate(date)
    }
    request.setPosUuid(posUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().getAvailableRefund(
      request,
      metadata,
      callback
    );
  }

  //  List Available Sellers
  listAvailableSellers({
    token,
    posUuid,
    isOnlyAllocated,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailableSellersRequest } = this.stubFile;
    const request = new ListAvailableSellersRequest()
    if (posUuid) {
      request.setPosUuid(posUuid)
    }
    if(isOnlyAllocated) {
      request.setIsOnlyAllocated(isOnlyAllocated)
    }
    request.setPageSize(pageSize)
    request.setPageToken(pageToken)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailableSellers(
      request,
      metadata,
      callback
    );
  }

  //  Print Ticket
  printTicket({
    token,
    posUuid,
    orderUuid,
    language
  }, callback) {
    const { PrintTicketRequest } = this.stubFile;
    const request = new PrintTicketRequest()
    request.setPosUuid(posUuid)
    request.setOrderUuid(orderUuid)
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().printTicket(
      request,
      metadata,
      callback
    );
  }

  //  Print Ticket Preview
  printPreview({
    token,
    posUuid,
    orderUuid,
    reportType,
    language
  }, callback) {
    const { PrintPreviewRequest } = this.stubFile;
    const request = new PrintPreviewRequest();

    request.setPosUuid(posUuid);
    request.setOrderUuid(orderUuid);
    request.setReportType(reportType);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().printPreview(
      request,
      metadata,
      callback
    );
  }

  //  Print Ticket shipment Preview
  printShipmentPreview({
    token,
    posUuid,
    shipmentUuid,
    reportType,
    language
  }, callback) {
    const { PrintShipmentPreviewRequest } = this.stubFile;
    const request = new PrintShipmentPreviewRequest();

    request.setPosUuid(posUuid);
    request.setShipmentUuid(shipmentUuid);
    request.setReportType(reportType);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().printShipmentPreview(
      request,
      metadata,
      callback
    );
  }

  //  Print Ticket
  listStocks({
    token,
    posUuid,
    sku,
    value,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListStocksRequest } = this.stubFile;
    const request = new ListStocksRequest();

    request.setPosUuid(posUuid);
    request.setSku(sku);
    request.setValue(value);
    request.setPageSize(pageSize);
    request.setPageToken(pageToken);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listStocks(
      request,
      metadata,
      callback
    );
  }

  // List Available Warehouses
  listAvailableCash({
    token,
    posUuid,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListAvailableCashRequest } = this.stubFile;
    const request = new ListAvailableCashRequest();

    request.setPosUuid(posUuid);
    request.setPageSize(pageSize);
    request.setPageToken(pageToken);
    request.setClientRequest(
      createClientRequest({ token, language })
    );

    const metadata = getMetadata({
      token
    });

    this.getPointOfSalesService().listAvailableCash(
      request,
      metadata,
      callback
    );
  }
}

module.exports = PointOfSales;
