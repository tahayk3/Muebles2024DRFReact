from django.test import TestCase
from .models import FurnitureModel, FornitureImageModel, FornitureModel3DModel

# pruebas de modelos
# utilizando el framework de pruebas de Django(TestCase)
#Estas pruebas aseguran que el modelo FurnitureModel se comporta como se espera en términos de creación de objetos y su representación como cadena.
class FurnitureModelText(TestCase):
    #   setUp se ejecuta antes de cada método de prueba. Su propósito es preparar el entorno para las pruebas,
    #   creando una instancia del modelo que se utilizará en las pruebas.
    def setUp(self):
        self.furniture = FurnitureModel.objects.create(
            name = "Organizador mediana",
            description  = "Mueble organizador para organizar, cunta con varios espacios",
            price = 625,
            stock = 3 ,
        )

    #Verificar que el objeto FurnitureModel se haya creado correctamente con los atributos especificados.
    def test_furniture_creation(self):
        #self.assertEqual para comparar el valor del atributo del objeto self.furniture con el valor esperado. Si el valor no coincide, la prueba fallará.
        self.assertEqual(self.furniture.name, "Organizador mediana")
        self.assertEqual(self.furniture.description, "Mueble organizador para organizar, cunta con varios espacios")
        self.assertEqual(self.furniture.price, 625)
        self.assertEqual(self.furniture.stock, 3)
    
    #Verifica que el método __str__ del modelo funciona correctamente.
    def test_furniture_str(self):
        self.assertEqual(str(self.furniture), "Organizador mediana")
