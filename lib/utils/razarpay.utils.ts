const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const initiateRazorpayPayment = async (
  amount: number,
  orderId: string,
  customerEmail: string,
  customerPhone: string,
  customerName: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      const amountInPaise = Math.round(Number(amount) * 100);

      if (!amountInPaise || amountInPaise <= 0) {
        throw new Error("Invalid amount passed to Razorpay");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: "INR",
        name: "UniSouk",
        description: "Order Payment",
        order_id: String(orderId),
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#f97316",
        },
        handler: async (response: any) => {
          resolve(true);
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.on("payment.failed", (response: any) => {
        console.error("Payment failed event:", response);
        reject(new Error(`Payment failed: ${response.error.description}`));
      });

      await razorpay.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      reject(error);
    }
  });
};

export { loadRazorpayScript, initiateRazorpayPayment };
