function Footer() {
  
   const newDate = new Date()
   const year = newDate.getFullYear();

   return (
    <footer className="footer">
      <p className="footer__copyright">© {year} Mesto Russia</p>
    </footer>
  )
}
  
  export default Footer; 