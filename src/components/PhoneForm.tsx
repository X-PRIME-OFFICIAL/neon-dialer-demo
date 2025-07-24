import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PhoneForm = () => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const validatePhone = (value: string) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(value);
    setIsValid(validatePhone(value) || value.length === 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      setIsValid(false);
      toast({
        title: "Invalid Phone Number",
        description: "Please enter exactly 11 digits",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Success!",
      description: "Phone number submitted successfully",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setPhone("");
      setIsValid(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-neon-blue/20 animate-float blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-neon-pink/20 animate-float blur-3xl" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-green/10 animate-float blur-3xl" style={{ animationDelay: "2s" }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 rgb-border animate-glow">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-glow">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold neon-text">Enter Your Phone</CardTitle>
          <p className="text-muted-foreground">Please provide your 11-digit phone number</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="01*********"
                  className={`pr-10 transition-all duration-300 ${
                    !isValid
                      ? "border-destructive glow-pink"
                      : phone.length === 11
                      ? "border-neon-green glow-green"
                      : "border-primary glow-blue"
                  }`}
                  maxLength={11}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {phone.length === 11 && isValid ? (
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                  ) : !isValid ? (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  ) : null}
                </div>
              </div>
              {!isValid && (
                <p className="text-sm text-destructive flex items-center gap-2 animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  Please enter a valid 11-digit number.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {phone.length}/11 digits
              </p>
            </div>

            <Button
              type="submit"
              variant={isSubmitted ? "neon" : "rgb"}
              className="w-full h-12 text-lg font-semibold"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submitted Successfully!
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>

          {isSubmitted && (
            <div className="mt-6 p-4 rounded-lg bg-neon-green/10 border border-neon-green animate-glow">
              <p className="text-center text-sm text-neon-green neon-text">
                ✨ Phone number verification initiated! ✨
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};