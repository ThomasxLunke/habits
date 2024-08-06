import Header from "@/components/Header"

type DashboardLayoutProps = {
  children: React.ReactNode
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default DashboardLayout
