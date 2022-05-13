export function getBillingTypeFromMetaData(meta_data: any[]) {
  const billing = meta_data.find(item => item.key === "_billing_timologio");
  
  // STEP-1: If billing meta object doesn't exist then just show "Receipt"
  if (!billing) return "Απόδειξη"; // Απόδειξη -> Receipt
  
  // Retrieve value, should be either "N" or "Y"
  const billingValue = billing.value;

  // STEP-2 If billing meta object exist but value is "N" then show "Receipt"
  if (billingValue === "N") return "Απόδειξη"; // Απόδειξη -> Receipt

  return "Τιμολόγιο"; // Τιμολόγιο -> Invoice
}

export function getVoucherNumberFromMetaData(meta_data: any[]) {
  return meta_data.find(item => item.key === "wpslash_voucher_courier_tracking")?.value || "";
}

export function getTranslatedPaymentMethod(method_title: string) {
  if (method_title === 'Direct Bank Transfer') return 'Άμεση Τραπεζική Κατάθεση';
  if (method_title === 'Cash on Delivery') return 'Αντικαταβολή';

  return method_title
}

export function getShippingMethodCustom(shipping_method_title: string) {
  if (shipping_method_title === 'Flat Rate') return 'ACS Courier';

  return shipping_method_title
}

// const progressData = [{label: 'Σε επεξεργασία', value: 'processing'}, {label: 'Έφυγε', value: 'completed'}, {label: 'Έφτασε', value: 'deliverycompleted'}]

// For progress steps
export function getOrderStatusLabel(orderStatus) {
  if (orderStatus === "processing") {
    return { status: 'processing', label: "Σε επεξεργασία", description: "Λάβαμε την παραγγελία σου και βρίσκεται στο στάδιο επεξεργασίας." };
  }
  if (orderStatus === "completed") {
    return { status: 'completed', label: 'Έφυγε', description: "Η παραγγελία σου είναι στο δρόμο!" };
  }
  if (orderStatus === "deliverycompleted") {
    return { status: 'deliverycompleted', label: 'Έφτασε', description: "Η παραγγελία σου έφτασε!" };
  }
  return { label: orderStatus };
}