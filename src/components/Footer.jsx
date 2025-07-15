import { Upload, Github, Linkedin, Mail, Globe } from "lucide-react";

export default function Footer(){
    return (
         <footer className="mt-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 py-12">
                  <div className="flex flex-col items-center space-y-6">
                    <p className="text-lg font-light text-gray-600">Connect with me</p>
                    <div className="flex space-x-8">
                      <a
                        href="https://github.com/akanaskhan/AI-Chatbot"
                        className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                      <a
                        href="https://linkedin.com/in/muhammad-anas-khan786
                      "
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a
                        href="mailto:muhammadanaskhanak@gmail.com
                      "
                        className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                      >
                        <Mail className="w-6 h-6" />
                      </a>
                      <a
                        href="https://akanaskhan.vercel.app
                      "
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                      >
                        <Globe className="w-6 h-6" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-400 font-light">
                      © {new Date().getFullYear()} Anas Khan. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
    )
}