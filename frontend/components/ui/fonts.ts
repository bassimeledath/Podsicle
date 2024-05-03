
//we import Fonts we want
import { Inter, Lusitana } from 'next/font/google';
//import localFont from 'next/font/local'

//We specify the subset of that font that we want: in our case the latin font
export const inter = Inter({ subsets: ['latin'] });

//Secondary font
//We specify the subset of that font that we want: in our case the latin font

export const lusitana = Lusitana({
     subsets: ['latin'], 
     weight:['400', '700']}); 


//export const mexcellent = localFont({ src: './mexcellent-3d.otf' })