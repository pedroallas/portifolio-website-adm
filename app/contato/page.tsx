"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Linkedin, Send } from "lucide-react"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio do formulário
    console.log("Formulário enviado:", formData)
    alert("Mensagem enviada com sucesso! Retornarei em breve.")
    setFormData({ nome: "", email: "", mensagem: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contato@seudominio.com",
      href: "mailto:contato@seudominio.com",
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (11) 99999-9999",
      href: "tel:+5511999999999",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "São Paulo, SP - Brasil",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://instagram.com/seuusuario",
      color: "hover:text-pink-500",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/seuusuario",
      color: "hover:text-blue-600",
    },
  ]

  return (
    <main>
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-6">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pronto para criar designs que fazem a diferença? Vamos conversar sobre seu projeto!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Envie sua Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="nome">Nome *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        required
                        value={formData.mensagem}
                        onChange={handleChange}
                        className="mt-1 min-h-32"
                        placeholder="Conte-me sobre seu projeto, objetivos e prazos..."
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        {info.href !== "#" ? (
                          <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Acompanhe meu trabalho e fique por dentro das novidades:</p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-muted-foreground transition-colors ${social.color}`}
                      >
                        <social.icon className="h-6 w-6" />
                        <span className="sr-only">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8 text-center">
                  <h3 className="font-serif font-semibold text-xl mb-4">Pronto para começar?</h3>
                  <p className="mb-6 opacity-90">
                    Vamos criar designs que realmente fazem a diferença para seu negócio ou projeto educacional.
                  </p>
                  <div className="text-sm opacity-75">Resposta em até 24 horas • Orçamento gratuito</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
