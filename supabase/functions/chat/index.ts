
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the request body
    const { user_id, message } = await req.json();

    // Validate inputs
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Processing chat request for message: "${message.substring(0, 50)}..."`);

    // 1. Store in Supabase memory table
    const { error: memoryError } = await supabaseClient
      .from('memory')
      .insert({
        user_id,
        content: { input: message },
        source: 'ui'
      });

    if (memoryError) {
      console.error("Error storing message in memory:", memoryError);
    }

    // 2. Forward to n8n
    const n8nResponse = await fetch('https://brain.argoassist.com/webhook/argo_chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, message })
    });

    // Check if n8n request was successful
    if (!n8nResponse.ok) {
      console.error(`Error from n8n: ${n8nResponse.status} ${await n8nResponse.text()}`);
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to process request",
          message: "Argo is currently unavailable. Please try again later."
        }),
        { 
          status: 502, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse the n8n response
    const result = await n8nResponse.json();
    
    console.log(`Successfully processed chat request. Response length: ${JSON.stringify(result).length}`);

    // Return the response from n8n
    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again later."
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }  
      }
    );
  }
});
