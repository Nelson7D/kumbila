import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    session: null,
    user: null,
    profile: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Erro ao buscar perfil:', error);
          return null;
        }

        return data;
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return null;
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState((prevState) => ({ ...prevState, session, user: session?.user || null }));

        if (session?.user) {
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            setState((prevState) => ({ ...prevState, profile, isLoading: false }));
          }, 0);
        } else {
          setState((prevState) => ({ ...prevState, profile: null, isLoading: false }));
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setState((prevState) => ({ ...prevState, session, user: session?.user || null }));

      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setState((prevState) => ({ ...prevState, profile, isLoading: false }));
      } else {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo(a) de volta à Kumbila.",
      });

      navigate('/dashboard/usuario');
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const signUp = async (email, password, full_name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Registro realizado com sucesso!",
        description: "Verifique seu e-mail para confirmar seu cadastro.",
      });

      if (data.session) {
        navigate('/dashboard/usuario');
      }
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Tente novamente com outras credenciais.",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setState((prevState) => ({
        ...prevState,
        session: null,
        user: null,
        profile: null,
      }));

      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado da sua conta.",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: error.message || "Não foi possível fazer logout.",
        variant: "destructive",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Erro ao entrar com Google",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "E-mail enviado com sucesso",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error) {
      toast({
        title: "Erro ao solicitar redefinição",
        description: error.message || "Verifique se o e-mail está correto e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data) => {
    try {
      if (!state.user?.id) throw new Error("Usuário não está logado");

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', state.user.id);

      if (error) throw error;

      setState((prevState) => ({
        ...prevState,
        profile: prevState.profile ? { ...prevState.profile, ...data } : null,
      }));

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Não foi possível atualizar suas informações.",
        variant: "destructive",
      });
    }
  };

  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};