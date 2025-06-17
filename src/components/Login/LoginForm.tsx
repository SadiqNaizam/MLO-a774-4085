import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define Zod schema for form validation
const loginFormSchema = z.object({
  username: z.string()
    .min(1, { message: "Username is required." })
    .max(50, {message: "Username must be at most 50 characters."}),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(100, {message: "Password must be at most 100 characters."}),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    
    // Simulate API call
    // In a real application, replace this with an actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Example credential check
    if (data.username === "testuser" && data.password === "password123") {
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
      // form.reset(); // Uncomment to reset form on successful login
    } else {
      setSubmitError("Invalid username or password. Please try again.");
      // Optionally, clear password or set field-specific errors from server
      // form.setError("password", { type: "manual", message: "Incorrect password provided." });
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <h1 className="text-3xl font-bold text-card-foreground mb-6 text-left">Log in</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-card-foreground">Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Username" 
                    {...field} 
                    disabled={isLoading}
                    className={cn(form.formState.errors.username && "border-destructive focus-visible:ring-destructive")}
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-card-foreground">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    {...field} 
                    disabled={isLoading}
                    className={cn(form.formState.errors.password && "border-destructive focus-visible:ring-destructive")}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {submitError && (
            <p className="text-sm font-medium text-destructive">{submitError}</p>
          )}

          <Button
            type="submit"
            variant="default" // Shadcn default variant uses primary color
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        or, <a href="#" className="font-medium text-primary hover:text-primary/90 hover:underline">sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;
