import { Order } from "@/interface/order/order";

export const getUpdateButtonText = (orderData : Order | null) => {
    let resultText = "Unknown status";
    switch (orderData?.status) {
      case "placed":
        resultText = "Proceed with reserving the package";
        break;
      case "reserved":
        resultText = "Proceed with receiving the package";
        break;
      case "received":
        resultText = "Complete the package transaction";
        break;
      case "completed":
        resultText = "Package transaction is already completed";
        break;
      default:
        resultText = "Unknown status";
        break;
    }
    return resultText;
};

export const getNextPackageStatus = (orderData : Order | null) => {
    if (!orderData?.status) return;

    switch (orderData.status) {
      case "placed":
        return "reserved";
      case "reserved":
        return "received";
      case "received":
        return "completed";
      case "completed":
        return "completed";
      default:
        return "Unknown status";
    }
  };