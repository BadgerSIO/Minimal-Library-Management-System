const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted text-muted-foreground py-6">
      <div className="container mx-auto px-4 text-center text-xs md:text-sm">
        © {new Date().getFullYear()} Saad's Library. All rights reserved.
        <br />
        Built with ❤️ by Saad
      </div>
    </footer>
  );
};

export default Footer;
