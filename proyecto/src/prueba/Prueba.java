/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prueba;
import java.util.Scanner;
public class Prueba {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        Scanner jk = new Scanner (System.in);
        System.out.println("bienvendio a mi program de prueba");
        System.out.println("escriba hasta que numero quruire imprimir");
        int jc = jk.nextInt();
        int contador=1;
        while(contador<8){
            System.out.println("hola"+contador);
            contador=contador+1;
            
        }
        
 
    }
    
}
