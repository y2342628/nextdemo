


export default function Layout({
  children,
  page1,
  page2,
}: Readonly<{
  children: React.ReactNode;
  page1: React.ReactNode;
  page2: React.ReactNode;
}>) {
  return (
     <div>
       <div>{children}</div>
        <div>{page1}</div>
        <div>{page2}</div>
       
     </div>
  );
}



