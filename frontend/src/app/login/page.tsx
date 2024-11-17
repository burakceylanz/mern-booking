import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(124,196,117,0.7035407913165266) 0%, rgba(255,255,255,1) 50%)",
        filter:
          'progid:DXImageTransform.Microsoft.gradient(startColorstr="#7cc475",endColorstr="#ffffff",GradientType=1)',
      }}
      className="flex h-screen w-full items-center justify-center px-4"
    >
      <LoginForm />
    </div>
  );
}
