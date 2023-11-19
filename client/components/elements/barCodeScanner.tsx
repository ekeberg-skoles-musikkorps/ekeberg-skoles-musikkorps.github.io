import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

export function BarCodeScanner({ onScan }: { onScan(barcode: string): void }) {
  useEffect(() => {
    const scanner = new Html5Qrcode("qrCodeScanner");
    scanner.start(
      {
        facingMode: "environment",
      },
      { fps: 10 },
      (decodedText) => {
        onScan(decodedText);
      },
      () => {},
    );
    return () => {
      scanner.stop();
    };
  }, []);
  return <div id={"qrCodeScanner"}></div>;
}
