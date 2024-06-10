"use client";

import { useState, useMemo } from "react";
import {
  FormLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Container,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [count, setCount] = useState(1);
  const countArr = useMemo(() => {
    return [...new Array(count)].map((_, index) => index + 1);
  }, [count]);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  return (
    <main>
      <Container className="container py-3" maxWidth="xl">
        <form className="flex flex-col gap-y-2 justify-start items-start">
          {countArr.map((count, index) => (
            <div
              key={count}
              className="flex items-center justify-start flex-grow w-full gap-x-3"
            >
              <FormLabel>Device Token {count}</FormLabel>
              <FormControl className="flex-grow">
                <InputLabel htmlFor={`device-token-${count}`}>
                  Device Token
                </InputLabel>
                <Input
                  id={`device-token-${count}`}
                  aria-describedby="device-token-desc"
                />
              </FormControl>
              {countArr.length !== 1 && (
                <Button
                  className="flex-shrink-0 self-stretch"
                  variant="contained"
                  onClick={decrement}
                >
                  <Icon icon="mdi:minus" height={20}></Icon>
                </Button>
              )}
              {index + 1 === countArr.length && (
                <Button
                  className="flex-shrink-0 self-stretch"
                  variant="contained"
                  onClick={increment}
                >
                  <Icon icon="mdi:add" height={20}></Icon>
                </Button>
              )}
            </div>
          ))}

          <FormControl>
            <InputLabel htmlFor="message-title">Message Title</InputLabel>
            <Input id="message-title" aria-describedby="message-title-desc" />
            <FormHelperText id="message-title-desc">1</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="message-body">Message Body</InputLabel>
            <Input id="message-body" aria-describedby="message-body-desc" />
            <FormHelperText id="message-body-desc">2</FormHelperText>
          </FormControl>
        </form>
      </Container>
    </main>
  );
}
