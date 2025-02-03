"use client"; 
import useProjectsStore from '@/store/projectsStore';
import React from 'react'
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Products } from './Products';

export default function ProjectComponent({product}:{product:any}) {
    const { projectData } = useProjectsStore(); 
    
  
    return (
      <Container>
        <span className="text-4xl">⚡</span>
        <Heading className="font-black mb-10">
          {" "}
          What I&apos;ve been working on
        </Heading>
  
        <Products products={product || projectData}/>
      </Container>
    );
  }
  